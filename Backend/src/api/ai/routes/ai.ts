export default {
  routes: [
    {
      method: "POST",
      path: "/ai/generate-seo",
      handler: "ai.generateSeo",
      config: {
        auth: false,
      },
    },
  ],
};
