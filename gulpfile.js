const gulp = require("gulp");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const terser = require("gulp-terser");
const rename = require("gulp-rename");

function styles() {
    return (
        gulp.src("css/*.scss", "css/*.css")
            .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(postcss([autoprefixer(), cssnano()]))
            .pipe(sourcemaps.write("."))
            .pipe(gulp.dest("css"))
    );
}

function js() {
    return (
        gulp.src(["js/*.js", "!js/*min.js"])
            .pipe(terser())
            .pipe(rename({
                suffix: ".min"
            }))
            .pipe(gulp.dest("js"))
    );
}

function watch() {
    gulp.watch("css/*.scss", styles);
    gulp.watch(["js/*.js", "!js/*min.js"], js);
}

const build = gulp.parallel(styles, js);
//const build = gulp.series(styles,js); runs styles->js - gulp.parallel can be called in .series!

exports.styles = styles;
exports.js = js;
exports.watch = watch;
exports.build = build;