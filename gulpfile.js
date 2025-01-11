const gulp = require('gulp');
const uglify = require('gulp-uglify');
const buffer = require('vinyl-buffer');

const source = require('vinyl-source-stream');
const browserify = require('browserify');
const sass = require('gulp-dart-sass');
const clean_css = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');

const browserSync = require('browser-sync').create();

const dist = './land/admin';
const dist_prod = './build';

gulp.task('copy-html', () => {
    return gulp.src('./app/index.html')
        .pipe(gulp.dest(dist));
});

gulp.task('copy-api', () => {
    gulp.src('./app/api/**/*.*')
        .pipe(gulp.dest(dist + '/api'));

    gulp.src('./app/api/**/.*')
        .pipe(gulp.dest(dist + '/api'));
});

gulp.task('copy-assets', () => {
    return gulp.src('./app/assets/**/*.*')
        .pipe(gulp.dest(dist + '/assets'));
});

gulp.task('build-js', () => {
    return browserify('./app/src/main.js', {debug: true})
            .transform('babelify', {presets: ['@babel/preset-env'], sourceMap: true})
            .bundle()
            .pipe(source('bundle.js'))
            .pipe(gulp.dest(dist))
});

gulp.task('build-sass', () => {
    return gulp.src('./app/scss/**/*.scss')
            .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
            .pipe(gulp.dest(dist));
});


gulp.task('watch', () => {
    gulp.watch('./app/index.html', gulp.parallel('copy-html'));
    gulp.watch('./app/assets/**/*.*', gulp.parallel('copy-assets'));
    gulp.watch('./app/api/**/*.*', gulp.parallel('copy-api'));
    gulp.watch('./app/api/**/.*', gulp.parallel('copy-api'));
    gulp.watch('./app/src/**/*.js', gulp.parallel('build-js'));
    gulp.watch('./app/scss/**/*.scss', gulp.parallel('build-sass'));
});

gulp.task('build', gulp.parallel('copy-html', 'copy-api', 'copy-assets', 'build-js', 'build-sass'));

gulp.task('default', gulp.parallel('watch', 'build'));

// build prod
gulp.task('build-prod', () => {
    gulp.src('./app/index.html')
        .pipe(gulp.dest(dist_prod));

    gulp.src('./app/api/**/*.*')
        .pipe(gulp.dest(dist_prod + '/api'));

    gulp.src('./app/api/**/.*')
        .pipe(gulp.dest(dist_prod + '/api'));

    gulp.src('./app/assets/**/*.*')
        .pipe(gulp.dest(dist_prod + '/assets'));

    browserify('./app/src/main.js', {debug: false})
        .transform('babelify', {presets: ['@babel/preset-env'], sourceMap: false})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(dist_prod));

    gulp.src('./app/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(clean_css())
        .pipe(gulp.dest(dist_prod));
});


// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./land"
        }
    });

    gulp.watch("./land/**/*.*").on("change", browserSync.reload);
});
