module.exports = {
  framework: "@storybook/react",
  core: { builder: "webpack5" },
  features: { babelModeV7: true },
  stories: ["../src/*/stories/*.stories.@(ts|tsx)"],
  addons: [
    "storybook-addon-preview",
    "@storybook/addon-essentials",
    "storybook-addon-react-docgen",
    "@storybook/addon-a11y",
    {
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          implementation: require("postcss"),
        },
      },
    },
  ],
};
