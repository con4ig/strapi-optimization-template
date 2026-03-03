import { Core } from "@strapi/strapi";

export default {
  async generateSeo(ctx) {
    try {
      const { content } = ctx.request.body;
      if (!content) {
        return ctx.badRequest("Content is required");
      }

      // Automatically infer the correct Service based on plugin/api structure
      const parsed = await strapi.service("api::ai.ai").generateSeo(content);

      return parsed;
    } catch (err) {
      strapi.log.error("AI Controller Error:", err);
      return ctx.internalServerError("Failed to generate SEO: " + err.message);
    }
  },
};
