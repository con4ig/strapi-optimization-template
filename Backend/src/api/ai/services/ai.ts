import { Core } from "@strapi/strapi";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  async generateSeo(content: string) {
    if (!content) {
      throw new Error("Content is required to generate SEO");
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Mocked response for testing without an API key
      return {
        metaTitle: "The Blueprint | AI-Optimized Draft",
        metaDescription:
          "This is a mocked SEO description. Add GEMINI_API_KEY to your .env file to enable real Google Gemini 1.5 Flash generation.",
      };
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // Ordered list of models to try
    const modelsToTry = [
      "gemini-2.5-flash",
      "gemini-3.1-flash-lite",
      "gemini-3-flash-preview",
      "gemini-2.0-flash",
      "gemini-1.5-flash",
      "gemini-1.5-flash-8b",
    ];

    let lastError: any = null;

    for (const modelName of modelsToTry) {
      try {
        strapi.log.info(`AI SEO: Trying model ${modelName}...`);
        const model = genAI.getGenerativeModel({ model: modelName });

        const prompt = `
          You are an expert SEO copywriter.
          Analyze the following article content and generate highly optimized SEO metadata.
          
          Requirements:
          1. "metaTitle": A compelling, SEO-friendly title (max 60 characters).
          2. "metaDescription": A compelling meta description summarizing the content (max 160 characters).
          3. "keywords": A comma-separated list of highly relevant SEO keywords (e.g. "Next.js, Web, Code").
          4. "metaRobots": Usually "index, follow" unless it seems like a private draft.
          5. "structuredData": A valid JSON-LD structure (e.g. Article schema) describing the content. Return it as a parsed JSON object (not a string).
          
          Return ONLY valid JSON in this exact format, with no markdown formatting, no backticks, and no extra text:
          {
            "metaTitle": "Your Title Here",
            "metaDescription": "Your description here.",
            "keywords": "keyword1, keyword2",
            "metaRobots": "index, follow",
            "structuredData": {}
          }
          
          Article Content:
          ${content}
        `;

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        // Ensure JSON is clean from markdown ticks
        const cleanedText = text
          .replace(/```json/gi, "")
          .replace(/```/gi, "")
          .trim();

        const parsed = JSON.parse(cleanedText);
        strapi.log.info(`AI SEO: Successfully generated using ${modelName}`);
        return parsed;
      } catch (err: any) {
        lastError = err;
        strapi.log.warn(
          `AI SEO: Model ${modelName} failed. Error: ${err.message}`,
        );
        // Continue to the next model in the fallback list
        continue;
      }
    }

    // Fallback if all models fail
    strapi.log.error(
      "AI SEO: All Gemini models failed or reached quota limits.",
    );
    return {
      metaTitle: "The Blueprint | SEO Draft (Manual Review)",
      metaDescription: `AI Generation was unavailable (Rate Limit reached). Please review this content manually. [Error: ${lastError?.message}]`,
    };
  },
});
