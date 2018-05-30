let gulp = require('gulp');
let uglify = require('gulp-uglify');
let concat = require('gulp-concat');
let rename = require('gulp-rename');
let cleancss = require('gulp-clean-css');

gulp.task('scripts', ()=>{
    return gulp.src('public/javascripts/**/*.js')
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('public/dist/js'))
    .pipe(rename('script.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/dist/js'))
});

gulp.task('mmcss', ()=>{
    return gulp.src('public/stylesheets/**/*.css')
    .pipe(concat('style.css'))
    .pipe(gulp.dest('public/dist/css'))
    .pipe(rename('style.min.css'))
    .pipe(cleancss())
    .pipe(gulp.dest('public/dist/css'))
});


gulp.task('default',[ 'scripts', 'mmcss']);

gulp.watch('public/javascripts/**/*.js').on('change', ()=>{
    return gulp.src('public/javascripts/**/*.js')
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('public/dist/js'))
    .pipe(rename('script.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/dist/js'))
});

gulp.watch('public/stylesheets/**/*.css').on('change', ()=>{
    return gulp.src('public/stylesheets/**/*.css')
    .pipe(concat('style.css'))
    .pipe(gulp.dest('public/dist/css'))
    .pipe(rename('style.min.css'))
    .pipe(cleancss())
    .pipe(gulp.dest('public/dist/css'))
});



