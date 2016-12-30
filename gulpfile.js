var gulp = require('gulp');
var imagemin = require('gulp-imagemin');

gulp.task('default', function() {
  gulp.src('static/images/*.png')
      .pipe(imagemin())
      .pipe(gulp.dest('static/images'))
});
