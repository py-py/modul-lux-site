'use strict';

var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglifyjs'),
    cssnano     = require('gulp-cssnano'),
    rename      = require('gulp-rename'),
    del         = require('del');

gulp.task('sass', function () {
    return gulp.src('./app/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./app/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app',
            index: "index.html"
        },
        notify: false
    });
});

gulp.task('css-libs', ['sass'], function() {
    return gulp.src('./app/css/libs.css')
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./app/css'));
});

gulp.task('scripts', function() {
    return gulp.src([
        'app/libs/jquery/dist/jquery.min.js'
        ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./app/js'));
});

gulp.task('watch', ['browser-sync', 'css-libs', 'scripts'],  function() {
    gulp.watch('./app/sass/**/*.scss', ['sass']);
    gulp.watch('./app/*.html', browserSync.reload);
    gulp.watch('./app/js/**/*.js', browserSync.reload);
});

gulp.task('clean', function() {
    return del.sync('dist');
});

// BUILD TASK
gulp.task('build', ['clean', 'sass', 'scripts'], function() {

    var buildCss = gulp.src([
        './app/css/main.min.css',
        './app/css/libs.min.css'
        ])
    .pipe(gulp.dest('dist/css'));

    var buildFonts      = gulp.src('./app/fonts/**/*').pipe(gulp.dest('dist/fonts'));
    var buildImages     = gulp.src('./app/images/**/*').pipe(gulp.dest('dist/images'));
    var buildIncludes   = gulp.src('./app/images/**/*').pipe(gulp.dest('dist/images'));
    var buildJs         = gulp.src('./app/js/**/*').pipe(gulp.dest('dist/js'));
    var buildVendor     = gulp.src('./app/vendor/**/*').pipe(gulp.dest('dist'));
    var buildHtml       = gulp.src('./app/*.html').pipe(gulp.dest('dist'));

});

// MAIN TASK
gulp.task('default', ['watch']);