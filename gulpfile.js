var gulp = require("gulp"),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync').create(),
	postcss = require('gulp-postcss'),
	autoprefixer = require('autoprefixer'),
	plumber = require('gulp-plumber');


// scss
gulp.task('sass', function () {
	return gulp.src('./scss/**/*.scss')
		.pipe(plumber())
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(postcss([
			autoprefixer({
				browsers: ['last 2 versions', 'IE 9']
			})
		]))
		.pipe(gulp.dest('./css'));
});

// сервер dev
gulp.task('devServer', function () {
	browserSync.init({
		port: 9000,
		server: {
			baseDir: './'
		}
	});
});

// слежка
gulp.task('watch', function () {
	gulp.watch(['./**/*.html', './css/*.css']).on('change', browserSync.reload);
	gulp.watch(['./scss/**/*.scss'], ['sass']);
});

// таск по умолчанию
gulp.task('default', ['sass', 'devServer', 'watch']);
