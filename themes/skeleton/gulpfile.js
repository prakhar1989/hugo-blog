var gulp      = require('gulp'),
    concat    = require('gulp-concat'),
    rename    = require('gulp-rename'),
    minifyCSS = require('gulp-minify-css'),
    uglify    = require('gulp-uglify');


var fileOrder = [
    'static/css/ionicons.min.css', 
    'static/css/normalize.css', 
    'static/css/skeleton.css', 
    'static/css/main.css', 
    'static/css/highlight.css',
    'static/css/zoom.css'
];

var jsFileOrder = [
    'static/js/transition.js',
    'static/js/zoom.min.js'
];

gulp.task('default', function() {
    // concat and minify css
    gulp.src(fileOrder)
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('static'))
        .pipe(minifyCSS())
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest('static'));

    // concat and minify js
    gulp.src(jsFileOrder)
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('static'));
});

