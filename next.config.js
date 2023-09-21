// next.config.js
const withAntdLess = require("next-plugin-antd-less");
const withPlugins = require("next-compose-plugins");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  // enabled: process.env.ANALYZE === "true",
  enabled: true,
});

module.exports = withPlugins([
  [withBundleAnalyzer],
  [
    withAntdLess({
      lessVarsFilePath: "styles/less/variables.less",
      cssLoaderOptions: {},

      webpack(config) {
        return config;
      },
    }),
  ],
]);
// module.exports = {
//   distDir: ".next",
// };
