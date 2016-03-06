(function gulpfile()
{
	'use strict';

	var gulp = require('gulp');
	var plugins = require('gulp-load-plugins')({pattern: ['gulp-*', 'gulp.*', 'del', 'yargs'] });
	var browserSync = require('browser-sync').create();
	var noop = plugins.util.noop;
	var args = plugins.yargs.argv;
	var environ = args.env?args.env:'local';
	var isLocal;
	var app = 'src';
	var paths;

	/*
	 * Task Definitions
	 */

	// cleanup tasks
	gulp.task('clean',cleanTask);
	gulp.task('cleanAll',cleanAllTask);

	// linting tasks
	gulp.task('lint', lintTask);

	// build tasks
	gulp.task('scripts', scriptsTask);
	gulp.task('styles', stylesTask);
	gulp.task('inject', injectTask);
	gulp.task('build',
		gulp.series(
			'clean',
			'lint',
			gulp.parallel(
				'scripts',
				'inject'
	)));

	// development server run tasks
	gulp.task('start:server',startServerTask);
	gulp.task('watch',watchTask);
	gulp.task('start',
		gulp.series(
			gulp.parallel(
				'start:server',
				'watch'
			)
	));
	gulp.task('default',
		gulp.series(
			gulp.parallel(
				'lint',
				'styles'
			),
			'inject',
			'start'
		));

	// configuration variables
	paths =
	{
		scripts: app + '/**/*.js',
		styles: app + '/**/*.less',
		views:
		{
			main: app + '/index.html',
			files: app + '/**/*.html'
		},
		dest:
		{
			'localhost': 'dev',
			'localdev': 'dev',
			'development': 'build',
			'production': 'dist'
		}
	};

	// validate and default environment
	switch(environ)
	{
		case 'local':
		{
			isLocal = true;
			environ = args.db==='dev'?'localdev':'localhost';
			break;
		}

		case 'development':
		case 'production':
		{
			isLocal = false;
			break;
		}

		default:
		{
			isLocal = true;
			environ = 'localhost';
			break;
		}
	}

	/*
	 * Task Functions
	 */

	function cleanEnv(env)
	{
		return plugins.del([paths.dest[env]]);
	}

	function cleanTask()
	{
		return cleanEnv(environ);
	}

	function cleanAllTask()
	{
		// del returns a promose, so return a new promise that will resolve
		// when all environments have been cleaned
		return Promise.all(Object.keys(paths.dest).map(cleanEnv));
	}

	function lintTask()
	{
		return gulp.src(
			[
				paths.scripts
			])
			.pipe(plugins.jshint())
			.pipe(plugins.jscs())
			.pipe(plugins.jscsStylish.combineWithHintResults())
			.pipe(plugins.jshint.reporter('default'))
			.pipe(plugins.jshint.reporter('fail'));
	}

	function scriptsTask()
	{
		return gulp.src([paths.scripts])
			.pipe(isLocal?noop():plugins.concat('andrello.min.js'))
			.pipe(isLocal?noop():plugins.uglify())
			.pipe(gulp.dest(paths.dest[environ]));
	}

	function stylesTask()
	{
		return gulp.src('src/styles/andrello.less')
			.pipe(plugins.less())
			.pipe(isLocal?noop():plugins.cssnano())
			.pipe(plugins.autoprefixer())
			.pipe(gulp.dest(paths.dest[environ]));
	}

	function injectTask()
	{
		var srcOptions =
		{
			read:false,
			allowEmpty: true,
			cwd: app
		};
		var target = gulp.src('index.html', {cwd:app});
		var sources = gulp.src([ '**/*.js'], srcOptions);
		var cssSources;

		srcOptions.cwd = paths.dest[environ];
		cssSources = gulp.src('andrello.css', srcOptions);

		return target
			.pipe(plugins.inject(sources))
			.pipe(plugins.inject(cssSources))
			.pipe(plugins.wiredep(
			{
				verbose: true,
				ignorePath: '..'
			}))
			.pipe(gulp.dest(paths.dest[environ]));
	}

	function startServerTask(done)
	{
		browserSync.init(
			{
				server:
				{
					baseDir: [ paths.dest[environ], app],
					routes:
					{
						'/bower_components': 'bower_components'
					}
				},
				port: 9000,
				watchOptions:
				{
					ignoreInitial: true
				},
				files: ['src/**/*', '!src/**/*.less', '!src/**/*.css', '!'+paths.views.main, paths.dest[environ]],
				open: 'local',
				reloadOnRestart: true,
				reloadDelay: 500,
				reloadDebounce: 2000
			},
			done);
	}

	function watchTask()
	{
		gulp.watch([paths.views.main],
			gulp.series('inject'));

		gulp.watch([paths.styles],
			gulp.series('styles'));

		gulp.watch(paths.scripts,
			gulp.series(
				'lint',
				'inject'
		));
	}
})();
