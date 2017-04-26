'use strict';

var gulp = require('gulp'),
  watch = require('gulp-watch'),
  prefixer = require('gulp-autoprefixer'),
  uglify = require('gulp-uglify'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  rigger = require('gulp-rigger'),
  cssmin = require('gulp-minify-css'),
  imagemin = require('gulp-imagemin'),
  pngquant = require('imagemin-pngquant'),
  rimraf = require('rimraf'),
  browserSync = require("browser-sync"),
  uncss = require('gulp-uncss'),
  rigger = require('gulp-rigger'),
  htmlmin = require('gulp-htmlmin'),
  concat       = require('gulp-concat'),
  reload = browserSync.reload;
var path = {
  build: { 
    html: 'build/',
    js: 'build/js/',
    css: 'build/css/',
    img: 'build/img/',
    fonts: 'build/fonts/'
  },
  src: { 
    html: 'app/*.html', 
    js: 'app/js/*.js',
    style: 'app/css/*.css',
    img: 'app/img/**/*.*', 
    fonts: 'app/fonts/**/*.*',
    libs: 'app/libs/**/*.js'
  },
  watch: { 
    html: 'app/**/*.html',
    js: 'app/js/**/*.js',
    style: 'app/css/**/*.scss',
    img: 'app/img/**/*.*',
    fonts: 'app/fonts/**/*.*'
  },
  clean: './build'
};
var config = {
  server: {
    baseDir: "./build"
  },

};
gulp.task('html:build', function () {
  gulp.src(path.src.html) 
    .pipe(rigger())
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(path.build.html)) 
        .pipe(reload({stream: true})); 
});
gulp.task('scripts', function() {
  return gulp.src([ 
    'app/js/libs/jquery-3.2.1.min.js', 
    'app/js/libs/slick.min.js',
    'app/js/libs/parallax.js',
    'app/js/libs/wow.min.js'
  ])
    .pipe(concat('libs.min.js')) 
    .pipe(uglify()) 
    .pipe(gulp.dest('build/js')); 
});
gulp.task('wow:script', function() {
  return gulp.src([ 
    'app/js/libs/wow.min.js'
  ])
    .pipe(gulp.dest('build/js')); 
});
gulp.task('js:build', function () {
  gulp.src(path.src.js) 
    .pipe(concat('main.js'))
    .pipe(rigger()) 
    .pipe(sourcemaps.init()) 
    .pipe(uglify()) 
    .pipe(sourcemaps.write()) 
    .pipe(gulp.dest(path.build.js)) 
    .pipe(reload({stream: true})); 
});
gulp.task('style:build', function () {
  gulp.src(path.src.style) 
    .pipe(concat('css.css'))
    .pipe(sourcemaps.init()) 
    .pipe(sass())
    .pipe(prefixer())
    .pipe(cssmin())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.css)) 
    .pipe(reload({stream: true}));
});
gulp.task('image:build', function () {
  gulp.src(path.src.img) 
    .pipe(imagemin({ 
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()],
      interlaced: true
    }))
    .pipe(gulp.dest(path.build.img)) 
    .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
  gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts))
});
gulp.task('build', [
  'html:build',
  'scripts',
  'js:build',
  'style:build',
  'fonts:build',
  'image:build',
  'wow:script'
]);
gulp.task('watch', function(){
  watch([path.watch.html], function(event, cb) {
    gulp.start('html:build');
  });
  watch([path.watch.style], function(event, cb) {
    gulp.start('style:build');
  });
  watch([path.watch.js], function(event, cb) {
    gulp.start('js:build');
  });
  watch([path.watch.img], function(event, cb) {
    gulp.start('image:build');
  });

  watch([path.watch.fonts], function(event, cb) {
    gulp.start('fonts:build');
  });
});

gulp.task('clean', function (cb) {
  rimraf(path.clean, cb);
});
gulp.task('default', ['build', 'watch']);