var gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    csso = require('gulp-csso'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    browserSync = require('browser-sync'),
    nunjucksRender = require('gulp-nunjucks-render');


gulp.task('sass', function () {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
        .pipe(csso())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('image-min', function () {
    gulp.src('app/assets/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('app/assets/image-min'))
});

gulp.task('pages', function () {
    return gulp.src(['./app/**/*.html'])
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('./app'));
});

gulp.task('scripts', function() {
    return gulp.src('./app/js/main.js')
        .pipe(uglify())
        .pipe(gulp.dest('./app/js'))
});

gulp.task('nunjucks', function () {
    return gulp.src('app/pages/**/*.+(html|nunjucks)')
        .pipe(nunjucksRender({
            path: ['app/templates']
        }))
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


gulp.task('default', ['nunjucks', 'browser-sync', 'pages', 'scripts', 'sass'], function () {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
    gulp.watch('app/templates/**/*.html', ['nunjucks']);
});
