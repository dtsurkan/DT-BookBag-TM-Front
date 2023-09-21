// next.config.js
const withAntdLess = require('next-plugin-antd-less');
const nextTranslate = require('next-translate');
const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const path = require('path');
const runtimeConfig = require(path.join(__dirname, 'config', process.env.NODE_ENV));

// You can choose which headers to add to the list
// after learning more below.
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  // {
  //   key: 'Content-Security-Policy',
  //   value: // Your CSP Policy
  // }
];

module.exports = withPlugins(
  [
    [
      withAntdLess({
        lessVarsFilePath: 'styles/less/variables.less',
        cssLoaderOptions: {},
        lessVarsFilePathAppendToEndOfContent: true,

        webpack(config) {
          return config;
        },
      }),
    ],
    [nextTranslate],
    [withBundleAnalyzer],
  ],
  {
    publicRuntimeConfig: runtimeConfig,
    eslint: {
      // Warning: Dangerously allow production builds to successfully complete even if your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
    async headers() {
      return [
        {
          // Apply these headers to all routes in your application.
          source: '/(.*)',
          headers: securityHeaders,
        },
      ];
    },
  }
);
// module.exports = {
//   distDir: ".next",
// };
