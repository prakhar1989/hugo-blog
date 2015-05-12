var gulp = require('gulp');
var pngmin = require('gulp-pngmin');

gulp.task('default', function() {
  gulp.src('images/*.png')
      .pipe(pngmin())
      .pipe(gulp.dest('images'))
});
