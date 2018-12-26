const gulp = require('gulp');
const sass = require('node-sass');
const pug = require('gulp-pug');
const watch = require('gulp-watch');
const autoprefixer = require('gulp-autoprefixer');
const connect = require('gulp-connect');
const concat = require('gulp-concat');

gulp.task('sass', () => {
    gulp.src('Enyo-project/style/index.scss', {
        sourcemap: true,
        style: 'compressed'
    })
    .on('error', sass.logError)
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload())
});
gulp.task('pug', () => {
    return gulp.src('Enyo-project/pug/index.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./'))
        .pipe(connect.reload())
});

gulp.task('watch', () => {
    gulp.watch('Enyo-project/style/*.scss', ['sass']);
    gulp.watch('Enyo-project/pug/*.pug', ['pug']);
});

gulp.task('connect', () => {
    connect.server({
        port: 8000,
        root: './',
        livereload: true
    })
});

gulp.task('default', ['connect', 'watch']);
