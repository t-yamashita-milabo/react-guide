const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
  typescript: {
    reactDocgen: false,
  },
  features: {
    emotionAlias: false,
  },
  staticDirs: ["../public"],
  webpackFinal: async (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        modules: [
          ...(config.resolve.modules || []),
          path.resolve(__dirname, "../src"),
        ], // to use absolute path in stories
        alias: {
          ...config.resolve.alias,
        },
      },
    };
  },
};
