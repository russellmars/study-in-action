const gulp = require('gulp');
const rimraf = require('rimraf');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const stylelint = require('gulp-stylelint');
const less = require('gulp-less');

const srcDir = './src';
const distDir = './lib';

const entry = `${srcDir}/index.less`;

const plugins = [autoprefixer()];

function clean(cb) {
  rimraf(distDir, cb);
}

function buildCss() {
  return gulp
    .src(entry)
    .pipe(less())
    .pipe(postcss(plugins))
    .pipe(gulp.dest(distDir));
}

function minifyCss() {
  return gulp
    .src(`${distDir}/*.css`)
    .pipe(
      rename({
        extname: '.min.css'
      })
    )
    .pipe(cleanCSS())
    .pipe(gulp.dest(distDir));
}

function lint() {
  return gulp.src(`${srcDir}/*.less`).pipe(
    stylelint({
      reporters: [{ formatter: 'string', console: true }]
    })
  );
}

// exports.default = defaultTask;

exports.build = gulp.series(clean, lint, buildCss, minifyCss);

exports.lint = lint;
