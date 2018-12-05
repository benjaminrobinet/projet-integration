let gulp = require('gulp');
let postcss = require('gulp-postcss');
let browserSync = require('browser-sync').create();

let sass = require('gulp-sass');
let sourcemaps = require('gulp-sourcemaps');
let autoprefixer = require('autoprefixer');


gulp.task('serve', ['serve', 'css']);

gulp.task('serve', function () {
    browserSync.init({
        server: "./app"
    });

    gulp.watch("./dev/assets/scss/**/*.scss", ['css']);
    gulp.watch("app/**/*.html").on('change', browserSync.reload);
});

gulp.task('build', function () {});

gulp.task('css', function () {
    let plugins = [
        autoprefixer({
            browsers: ['last 2 version'],
            cascade: true
        })
    ];
    return gulp.src('./dev/assets/scss/**/*.scss')
        .pipe(postcss(plugins))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./app/static/css/'))
        .pipe(browserSync.stream());
});