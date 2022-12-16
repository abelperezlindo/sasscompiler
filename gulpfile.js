const gulp = require('gulp');
const dartSass = require('sass')
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const drupalThemePath = '..';
const fs = require('fs');

gulp.task('sass', function () {
    return gulp.src(drupalThemePath + '/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('css'));
});

gulp.task('testRender', async function () {

    try {
        const stream = fs.readFileSync('styles.scss', 'utf8');
        console.log('Input (.scss): \n' + stream);

        const result = dartSass.compileString(stream);
        console.log('\nNormal output (.css): \n' + result.css);

        const compressed = dartSass.compileString(stream, {style: "compressed"});
        console.log('\nCompressed output (.min.css): \n' + compressed.css);
    } catch (err) {
        console.error(err);
    }
});

gulp.task('watch', function() {
    gulp.watch(drupalThemePath + '/scss/**/*.scss ', gulp.series('sass'))
});

gulp.task('watchTest', function() {
    gulp.watch('./styles.scss', gulp.series('testRender'))
})