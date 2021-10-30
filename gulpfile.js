//Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass 
//const
const {src, dest, watch, series, parallel} = require('gulp');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const cssnano = require('gulp-cssnano');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const ts = require('gulp-typescript');

//const gulp = require('gulp');
//Babel = require('gulp-babel');
 
//sökvägar
const files = {
    htmlPath: "src/**/*.html",
    scssPath: "src/**/*.scss",
    tsPath: "src/ts/*.ts",
    jsPath: "src/js/*.js",
    imagePath: "src/img/*"
}

//HTMLtask, kopiera filer
function copyHTML() {
    return src(files.htmlPath)
    .pipe(dest('pub'));
}

//js-task, konkatinera och minifiera js-filer, se rätt fil
function jsTask() {
    return src(files.jsPath)
    .pipe(sourcemaps.init())
    .pipe(concat('js.js'))
    .pipe(terser())
    .pipe(sourcemaps.write('../maps'))
    .pipe(dest('pub/js'));
}



//CSS-task, konkatinera och minifiera, se rätt fil vid inspekt
/*function cssTask() {
    return src(files.cssPath)
    .pipe(sourcemaps.init())
    .pipe(concat('style.css'))
    .pipe(cssnano())
    .pipe(sourcemaps.write('../maps'))
    .pipe(dest('pub/css'))
    .pipe(browserSync.stream());
}*/

//Sasstask
function sassTask() {
    return src(files.scssPath)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(cssnano())
    .pipe(sourcemaps.write('../maps'))
    .pipe(dest('pub/css'))
    .pipe(browserSync.stream());
}

//image-task
function imageTask() {
    return src(files.imagePath)
    .pipe(imagemin())
    .pipe(dest('pub/img'));
}

function typescriptTask() {
    return src(files.tsPath)
    //.pipe(babel())
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(terser())
    .pipe(sourcemaps.write('../maps'))
    .pipe(dest('pub/js'));
}
//watcher med reload vid ändringar
function watchTask() {
    browserSync.init({
        server: "./pub"
    });
    watch([files.htmlPath, files.scssPath, files.imagePath, files.tsPath, files.jsPath], parallel(copyHTML, sassTask, imageTask, typescriptTask, jsTask)).on('change', browserSync.reload);
}

exports.default = series(
    parallel(copyHTML, sassTask, imageTask, typescriptTask, jsTask),
    watchTask
);