const
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', () => {
    gulp.src('./public/scss/**/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 4 versions', 'safari 5', 'ie 6-8'],
            grid: true
        }))
        .pipe(gulp.dest('./public/css'))
});

gulp.task('watch', ['sass'], () => {
    gulp.watch('./public/scss/**/*.scss', ['sass']);
});

gulp.task('default', ['watch']);