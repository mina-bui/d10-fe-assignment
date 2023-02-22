let gulp = require("gulp"),
  sass = require("gulp-sass")(require("sass"));
(sourcemaps = require("gulp-sourcemaps")),
  ($ = require("gulp-load-plugins")()),
  (postcss = require("gulp-postcss")),
  (postcssInlineSvg = require("postcss-inline-svg")),
  (pxtorem = require("postcss-pxtorem")),
  (postcssProcessors = [
    postcssInlineSvg({
      removeFill: true,
    }),
    pxtorem({
      propList: [
        "font",
        "font-size",
        "line-height",
        "letter-spacing",
        "*margin*",
        "*padding*",
      ],
      mediaQuery: true,
    }),
  ]);

const paths = {
  scss: {
    src: "./scss/style.scss",
    dest: "./css",
    watch: "./scss/**/*.scss",
  },
  js: {
    popper: "./node_modules/@popperjs/core/dist/umd/popper.min.js",
    dest: "./js",
  },
};

// Compile sass into CSS & auto-inject into browsers
function styles() {
  return gulp
    .src(paths.scss.src)
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        quietDeps: true,
      }).on("error", sass.logError)
    )
    .pipe($.postcss(postcssProcessors))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.scss.dest));
}

// Move the javascript files into our js folder
function js() {
  // return gulp.src(paths.js.popper).pipe(gulp.dest(paths.js.dest));
}

// Static Server + watching scss/html files
function serve() {
  gulp.watch([paths.scss.watch], styles);
}

const build = gulp.series(styles, gulp.parallel(js, serve));

exports.styles = styles;
exports.js = js;
exports.serve = serve;

exports.default = build;
