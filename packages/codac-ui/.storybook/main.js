import path, { resolve } from "node:path";

const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.{ts,tsx}"],
  addons: ["@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    //   // "@storybook/addon-a11y",
    "@storybook/addon-styling",
    //   , "@storybook/addon-mdx-gfm"
  ],
  framework: path.resolve(require.resolve('@storybook/nextjs/preset'), '..'),
  core: {
    // disableTelemetry: true,
    enableCrashReports: true
  },

  staticDirs: [resolve(__dirname, "..", "assets")]
};
export default config;