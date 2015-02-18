var gulp = require('gulp');
var pngmin = require('gulp-pngmin');

gulp.task('pngmin', function() {
  gulp.src('images/*.png')
      .pipe(pngmin())
      .pipe(gulp.dest('images'))
});
