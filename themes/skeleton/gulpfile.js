var gulp      = require('gulp'),
    concat    = require('gulp-concat'),
    rename    = require('gulp-rename'),
    minifyCSS = require('gulp-minify-css');


var fileOrder = [
  'static/css/ionicons.min.css', 
  'static/css/normalize.css', 
  'static/css/skeleton.css', 
  'static/css/main.css', 
  'static/css/railscasts.css'
];

gulp.task('default', function() {
  gulp.src(fileOrder)
      .pipe(concat('styles.css'))
      .pipe(gulp.dest('static'))
      .pipe(minifyCSS())
      .pipe(rename('styles.min.css'))
      .pipe(gulp.dest('static'))
});
