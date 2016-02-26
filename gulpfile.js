(function()
{
	'use strict';

	var gulp = require('gulp');
	var plugins = require('gulp-load-plugins')({pattern: ['gulp-*', 'gulp.*', 'del'] });

	var app = 'src';
	var paths =
	{
		scripts: app + '/**/*.js',
		styles: app + '/**/*.less',
		views:
		{
			main: app + '/index.html',
			files: app + '/**/*.html'
		}
	};

	gulp.task('scripts', scriptsTask);
	gulp.task('lint', lintTask);
	gulp.task('styles', stylesTask);
	gulp.task('inject', injectTask);
	gulp.task('wiredep',wiredepTask);
	gulp.task('clean',cleanTask);

	gulp.task('start:server',startServerTask);
	gulp.task('start:client', startClientTask);
	gulp.task('reload', reloadServerTask);
	gulp.task('watch',watchTask);
	gulp.task('start',
		gulp.series(
			gulp.parallel(
				'start:server',
				'start:client',
				'watch'
			)
	));
	gulp.task('default',
		gulp.series(
			gulp.parallel(
				'lint',
				'styles'
			),
			'wiredep',
			'inject',
			'start',
			'watch'
		));

	function scriptsTask()
	{
		return gulp.src(
			[
				'src/**/*.js'
			])
			.pipe(plugins.concat('andrello.min.js'))
			.pipe(plugins.uglify())
			.pipe(gulp.dest('dist'));
	}

	function lintTask()
	{
		return gulp.src(
			[
				'src/**/*.js'
			])
			.pipe(plugins.jshint())
			.pipe(plugins.jshint.reporter('default'))
			.pipe(plugins.jshint.reporter('fail'));
	}

	function stylesTask()
	{
		return gulp.src('src/styles/andrello.less')
			.pipe(plugins.less())

			// .pipe(plugins.cssnano())
			.pipe(plugins.autoprefixer())
			.pipe(gulp.dest('dist'));
	}

	function injectTask()
	{
		var target = gulp.src(paths.views.main);
		var sources = gulp.src([paths.scripts, 'dist/**/*.css'], {read:false,
 allowEmpty:true});

		return target
			.pipe(plugins.inject(sources, {relative: true}))
			.pipe(gulp.dest('src'));
	}

	function wiredepTask()
	{
		return gulp.src('./src/index.html')
			.pipe(plugins.wiredep(
			{
				verbose: true
			}))
			.pipe(gulp.dest('./src'));
	}

	function cleanTask(done)
	{
		// del(['dist'], done);
		plugins.del(['dist'], done);
	}

	function startServerTask(done)
	{
		/* return gulp.src(__filename)
			.pipe(*/
		plugins.connect.server(
		{
			root: ['src','.'],
			livereload: true,

			// Change this to '0.0.0.0' to access the server from outside.
			port: 9000
		}, done);// );
	}

	function reloadServerTask()
	{
		return gulp.src(__filename)
			.pipe(plugins.connect.reload());
	}

	function startClientTask()
	{
		return gulp.src(__filename)
			.pipe(plugins.open({app:'chrome',
 uri:'http://localhost:9000'}));
	}

	function watchTask()
	{
		gulp.watch([paths.styles],
			gulp.series(
				'styles',
				'reload'
		));

		gulp.watch(paths.views.files, reloadServerTask);

		gulp.watch(paths.scripts,
			gulp.series(
				'lint',
				'wiredep',
				'inject',
				'reload'
		));
	}
})();
