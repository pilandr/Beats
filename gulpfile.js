const {src, dest, task, series, watch, parallel} = require("gulp");
const rm = require( 'gulp-rm' );
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
// const px2rem = require('gulp-smile-px2rem');
const gcmq = require('gulp-group-css-media-queries'); //gulp-group-css-media-queries
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
// const svgo = require('gulp-svgo');
// const svgSprite = require('gulp-svg-sprite');
const gulpif = require('gulp-if');
const strip = require('gulp-strip-comments');
const {SRC_PATH, DIST_PATH, STYLES_LIBS, JS_LIBS} = require("./gulp.config");

const env = process.env.NODE_ENV;
///////////////////////
task( "clean", () => {
  return src( `${DIST_PATH}/**/*`, { read: false }).pipe( rm() )
})
///////////////////////
const filesForCopy = [
  `!${SRC_PATH}/index.html`,
  `${SRC_PATH}/img/*.*`,
  `!${SRC_PATH}/js/*.*`
]

task("copy", () => {
  return src(filesForCopy,{base: `${SRC_PATH}`})
        .pipe(dest(`${DIST_PATH}`))
        .pipe(reload({stream: true}));
});
//////////////////////
task("copy:html", () => {
  return src(`${SRC_PATH}/index.html`)
        .pipe(strip())
        .pipe(dest(`${DIST_PATH}`))
        .pipe(reload({stream: true}));
});

////////////////////////
const styleFiles = [
  "./node_modules/normalize.css/normalize.css",
  `./${SRC_PATH}/scss/main.scss`
];

task("styles", () => {
  return src(styleFiles)
  .pipe(gulpif(env == "dev", sourcemaps.init()))
  .pipe(concat("main.min.scss"))
  .pipe(sassGlob())
  .pipe(sass().on('error', sass.logError))
  // .pipe(px2rem())
  .pipe(
    gulpif(
      env == "dev",
      autoprefixer({cascade: false})
    )
  )
  .pipe(gulpif(env == "prod",gcmq()))
  .pipe(gulpif(env == "prod",cleanCSS()))
  .pipe(gulpif(env == "dev",sourcemaps.write()))
  .pipe(dest(`${DIST_PATH}/css`))
  .pipe(reload({stream: true}));
});

///////////////////////////////////////////

const libs = [
  "./node_modules/jquery/dist/jquery.js",
  // "./dev/js/first/*.js",
  `./${SRC_PATH}/js/second/*.js`,
  `./${SRC_PATH}/js/*.js`
]

task("scripts", () => {
  return src(libs)
  .pipe(gulpif(env == "dev",sourcemaps.init()))
  .pipe(concat("main.min.js", {newLine: ";"}))
  // .pipe(gulpif(env == "prod",
  //     babel({presets: ['@babel/env']})
  //     )   
  // )
  .pipe(gulpif(env == "prod",uglify()))
  .pipe(gulpif(env == "dev",sourcemaps.write()))
  .pipe(dest(`${DIST_PATH}/js`))
  .pipe(reload({stream: true}));
});
///////////////////////////////////////////

// task("icons", () => {

// });

/////////////////////////////////////////
task('browser-sync', () => {
  browserSync.init({
      server: {
          baseDir: "./docs"
      },
      open: false
  });
});

task("watch", () => {
  watch(`./${SRC_PATH}/components/**/*`,series("styles"));
  watch(`./${SRC_PATH}/scss/**/*`,series("styles"));
  watch(`./${SRC_PATH}/*.html`,series("copy"));
  watch(`./${SRC_PATH}/js/*.js`,series("scripts"));
});


task(
    "default",
    series("clean",
      parallel("copy","copy:html","styles","scripts"),
      parallel("watch","browser-sync")
    )
);


task(
    "build",
    series("clean",
      parallel("copy","copy:html","styles","scripts")
    )
);