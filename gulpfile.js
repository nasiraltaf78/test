var gulp        = require("gulp"),
    sass        = require("gulp-sass"),
    concat      = require("gulp-concat"),
    watch       = require("gulp-watch"),
    plumber     = require("gulp-plumber"),
    cssclean    = require("gulp-clean-css"),
    uglify      = require("gulp-uglify"),
    browserSync = require("browser-sync");


var src = {
    sass:   "src/sass/**/*.scss",
    js:     "src/js/**/*.js"
};


var output = {
    js:     "output/js",
    css:    "output/css",
    html:   "output/**/*.html",
    min_css:"app.min.css",
    min_js: "app.min.js"
};


// SASS to CSS --------------------

var onError = function (err) {
    console.log(err);
    this.emit('end');
};

gulp.task('sass', function () {
    return gulp.src(src.sass)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(sass())
        .pipe(concat(output.min_css))
        .pipe(gulp.dest(output.css))
        .pipe(cssclean())
        .pipe(gulp.dest(output.css))
        .pipe(browserSync.reload({stream: true}));
});


// Compile JS --------------------

gulp.task('js', function () {
    return gulp.src(src.js)
        .pipe(plumber())
        .pipe(uglify())
        .pipe(concat(output.min_js))
        .pipe(gulp.dest(output.js));
});


// Watch --------------------

gulp.task('watch', function () {
    browserSync.init({
        server: './output'
    });
    gulp.watch(src.js, ['js']);
    gulp.watch(src.sass, ['sass']);
    gulp.watch(output.html).on('change', browserSync.reload);
});


// Default --------------------

gulp.task('default', ['watch', 'sass', 'js']);