var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    browserSync = require('browser-sync'),
    nunjucksRender = require('gulp-nunjucks-render');


gulp.task('sass', function () {
    return gulp.src('app/scss/**/*.scss')
       .pipe(sass().on('error', sass.logError))
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('image-min', function () {
    gulp.src('app/assets/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('app/assets/image-min'))
});

gulp.task('nunjucks', function() {
    // Gets .html and .nunjucks files in pages
    return gulp.src('app/pages/**/*.+(html|nunjucks)')
    // Renders template with nunjucks
        .pipe(nunjucksRender({
            path: ['app/templates']
        }))
        // output files in app folder
        .pipe(gulp.dest('app'))
});

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

gulp.task('default', ['nunjucks', 'browser-sync', 'sass'], function () {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/pages/**/*.+(html|nunjucks)', browserSync.reload);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
    gulp.watch('app/templates/**/*.html', ['nunjucks']);
});