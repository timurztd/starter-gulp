const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const mode = require('gulp-mode')();

const paths = require('../paths');

const postCssPlugins = [autoprefixer(), cssnano()];

const cssMain = () => {
  return gulp
    .src(paths.src.css)
    .pipe(plumber())
    .pipe(mode.development(sourcemaps.init()))
    .pipe(
      sass({
        sourceMap: true,
      }).on('error', sass.logError)
    )
    .pipe(postcss(postCssPlugins))
    .pipe(mode.development(sourcemaps.write()))
    .pipe(rename('styles.css'))
    .pipe(gulp.dest(paths.build.css));
};

const cssVendors = () => {
  return (
    gulp
      // EXAMPLE
      .src(['./node_modules/swiper/swiper-bundle.min.css'], {
        allowEmpty: true,
      })
      .pipe(concat('vendors.css'))
      .pipe(gulp.dest(paths.build.css))
  );
};

module.exports = { cssMain, cssVendors };
