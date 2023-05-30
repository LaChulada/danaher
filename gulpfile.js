var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');

gulp.task('images', function () {
    gulp.src('./src/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./web/themes/custom/bonterra/images'))
});

var sassConfig = {
    inputDirectory: './src/sass/**/*.scss',
    outputDirectory: './web/themes/custom/bonterra/css',
    options: {
        outputStyle: 'expanded',
        includePaths: ['node_modules']
    }
};

gulp.task('scripts', function () {
    return gulp.src([
        // We use gulp-handlebars Handlebars dist file, as Handlebars is actually a minor version
        // ahead at the moment and won't compile.
        './src/js/main.js'
    ])
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./web/themes/custom/bonterra/js'));
});

gulp.task('build-css', function () {
    return gulp
        .src(sassConfig.inputDirectory)
        .pipe(sass(sassConfig.options).on('error', sass.logError))
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(sassConfig.outputDirectory));
});

gulp.task('default', function () {
    gulp.watch('./src/sass/**/*.scss', gulp.series('build-css'));
    gulp.watch('./src/js/**/*.js', gulp.series('scripts'));
    gulp.watch('./src/images/**/*', gulp.series('images'));
});
