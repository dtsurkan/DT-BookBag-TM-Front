const { https } = require("firebase-functions");
const { default: next } = require("next");

const isDev = process.env.NODE_ENV !== "production";
console.log("process.env.", process.env);
console.log("isDev", isDev);
const nextjsDistDir = require("./next.config.js").distDir;

const nextjsServer = next({
  // NOTE THIS FEATURE! CHANGE WHEN DEPLOY IN PRODUCTION

  // dev: false, // for local testing
  dev: isDev,
  conf: {
    distDir: nextjsDistDir,
  },
});
const nextjsHandle = nextjsServer.getRequestHandler();

exports.nextjsFunc = https.onRequest((req, res) => {
  return nextjsServer.prepare().then(() => nextjsHandle(req, res));
});
