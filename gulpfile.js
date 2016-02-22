(function()
{
	'use strict';

	var gulp = require('gulp');
	var uglify = require('gulp-uglify');
	var concat = require('gulp-concat');
	var jshint = require('gulp-jshint');
	var less = require('gulp-less');
	var cssMinify = require('gulp-cssnano');
	var prefix = require('gulp-autoprefixer');
	var del = require('del');

	gulp.task('scripts', scriptsTask);
	gulp.task('lint', lintTask);
	gulp.task('styles', stylesTask);

	gulp.task('clean',cleanTask);

	function scriptsTask()
	{
		return gulp.src(
			[
				'src/**/*.js'
			])
			.pipe(concat('andrello.min.js'))
			.pipe(uglify())
			.pipe(gulp.dest('dist'));
	}

	function lintTask()
	{
		return gulp.src(
			[
				'src/**/*.js'
			])
			.pipe(jshint())
			.pipe(jshint.reporter('default'))
			.pipe(jshint.reporter('fail'));
	}

	function stylesTask()
	{
		return gulp.src('src/styles/andrello.less')
			.pipe(less())
			.pipe(cssMinify())
			.pipe(prefix())
			.pipe(gulp.dest('dist'));
	}

	function cleanTask(done)
	{
		del(['dist'], done);
	}
})();