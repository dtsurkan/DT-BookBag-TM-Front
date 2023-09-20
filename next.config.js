// next.config.js
const withAntdLess = require("next-plugin-antd-less");

module.exports = withAntdLess(
  {
    lessVarsFilePath: "styles/less/variables.less",
    cssLoaderOptions: {
      //   https://github.com/webpack-contrib/css-loader#object
      //
      //   sourceMap: true, // default false
      //   esModule: false, // default false
      //   modules: {
      //     exportLocalsConvention: 'asIs',
      //     exportOnlyLocals: true,
      //     mode: 'pure',
      //     getLocalIdent: [Function: getCssModuleLocalIdent]
      //   }
    },
    // Other Config Here...
    webpack(config) {
      return config;
    },
  },
  { distDir: ".next" }
);
// module.exports = {
//   distDir: ".next",
// };
