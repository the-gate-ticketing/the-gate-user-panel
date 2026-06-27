const fs = require("fs");
const path = require("path");

process.env.VUE_APP_VERSION = require("./package.json").version;

// Theme selection: VUE_APP_THEME picks a directory under src/themes/.
// Each theme provides theme.config.js, index.js (app shell), _tokens.scss
// and an optional public/ overlay copied into dist.
const theme = process.env.VUE_APP_THEME || "the-gate";
const themeDir = path.resolve(__dirname, "src/themes", theme);
const themeConfig = require(path.join(themeDir, "theme.config.js"));
const themePosixDir = themeDir.split(path.sep).join("/");

// The build ships as a webjar served by the backend under
//   /webjars/the-gate-user-panel/<version>/
// The backend rewrites the JS/CSS <script>/<link> paths in index.html, but it
// cannot touch the hashed asset URLs (images, fonts, svg) webpack emits *inside*
// the JS/CSS bundles. Those use webpack's publicPath (default "/"), so
// require()'d assets resolve to /img/... and 404. We keep the global publicPath
// at "/" (so the backend's index.html rewrite still works) and instead pin the
// asset loaders to the absolute webjar path so their emitted URLs resolve.
let webjarVersion = "";
try {
  const gp = fs.readFileSync(path.join(__dirname, "gradle.properties"), "utf8");
  const m = gp.match(/^\s*version\s*=\s*(.+?)\s*$/m);
  if (m) webjarVersion = m[1].trim();
} catch (e) {
  // gradle.properties is optional for `npm run serve`; fall back to "/".
}
const isProd = process.env.NODE_ENV === "production";
const assetPublicPath = `/webjars/the-gate-user-panel/${webjarVersion}/`;

module.exports = {
  css: {
    // Enable CSS source maps.
    sourceMap: process.env.NODE_ENV !== "production",
    loaderOptions: {
      scss: {
        // Injected before every SCSS compile; the kit's variables are all
        // !default, so theme tokens defined first take precedence.
        prependData: `@import "${themePosixDir}/tokens";`
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@theme": themeDir
      }
    }
  },
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      Object.assign(args[0], {
        title: themeConfig.title,
        brandName: themeConfig.brandName,
        faviconHref: themeConfig.faviconHref,
        fontsHref: themeConfig.fontsHref
      });
      return args;
    });
    const themePublic = path.join(themeDir, "public");
    if (fs.existsSync(themePublic)) {
      config.plugin("copy").tap(args => {
        const patterns = Array.isArray(args[0]) ? args[0] : args[0].patterns;
        patterns.push({ from: themePublic, to: "" });
        return args;
      });
    }

    // Resolve hashed asset URLs against the webjar path (see note above).
    if (isProd && webjarVersion) {
      ["images", "svg", "fonts", "media"].forEach(ruleName => {
        const rule = config.module.rule(ruleName);
        rule.uses.store.forEach(use => {
          use.tap(options => {
            options = options || {};
            options.publicPath = assetPublicPath;
            // url-loader hands large files to file-loader via `fallback`.
            if (options.fallback && options.fallback.options) {
              options.fallback.options.publicPath = assetPublicPath;
            }
            return options;
          });
        });
      });
    }
  }
};
