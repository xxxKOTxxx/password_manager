var gulp = require('gulp');
var clean = require('gulp-clean');
var merge = require('merge-stream');

var pug = require('gulp-pug');

var koutoSwiss = require('kouto-swiss');
var stylus = require('gulp-stylus');

var typescript = require('gulp-typescript');
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");

var connect = require('gulp-connect');
var historyApiFallback = require('connect-history-api-fallback');


var pug_options = {};

gulp.task(
  'clean',
  function() {
    return gulp.src('www', {read: false})
      .pipe(clean());
  }
);

gulp.task(
  'templates',
  function() {
    return gulp.src('src/**/*.pug', {base: './src'})
      .pipe(pug(pug_options))
      .pipe(gulp.dest('www/'))
      .pipe(connect.reload());;


    // var templates = gulp.src('src/tempaltes/*.pug', {base: './src'})
    //   .pipe(pug(pug_options))
    //   .pipe(gulp.dest('./www/templates'));
    //
    // return merge(root, templates).pipe(connect.reload());
  }
);


gulp.task(
  'styles',
  function() {
    gulp.src('src/stylus/styles.styl')
      .pipe(
        stylus(
          {
            'use': [koutoSwiss()]
          }
        )
      )
      .pipe(gulp.dest('www/css'))
      .pipe(connect.reload());
  }
);

gulp.task('scripts', function () {
  return browserify({
        basedir: '.',
        debug: true,
        entries: ['src/app/app.ts'],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .bundle()
    .pipe(source('js/app.js'))
    .pipe(gulp.dest("www"));
  // return gulp.src('src/**/*.ts')
  //   .pipe(typescript({
  //     // out: 'app.js',
  //     target: "es3",
  //     module: "commonjs",
  //     moduleResolution: "node",
  //     sourceMap: true,
  //     removeComments: true,
  //     emitDecoratorMetadata: true,
  //     experimentalDecorators: true,
  //     lib: [
  //       "dom",
  //       "es2015",
  //       "es5",
  //       "es6"
  //     ],
  //     noImplicitAny: true,
  //     suppressImplicitAnyIndexErrors: true
  //   }))
  //   .pipe(gulp.dest('www/'))
  //   .pipe(connect.reload());
});

gulp.task(
  'watch',
  function () {
    gulp.watch(['./src/*.pug', './src/*/*.pug'], ['templates']);
    gulp.watch(['./src/*/*.styl'], ['styles']);
    gulp.watch(['./src/**/*.ts'], ['scripts']);
});

gulp.task(
  'webserver',
  function() {
    connect.server({
      root: 'www',
      port: 8000,
      livereload: true,
      middleware: function(connect, opt) {
        return [ historyApiFallback() ];
      }
    });
  }
);

gulp.task(
  'default',
  ['clean'],
  function() {
    gulp.start('templates', 'styles', 'scripts', ['webserver', 'watch']);
  }
);