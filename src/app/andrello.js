(function andrello()
{
	'use strict';

	angular
		.module('Andrello',
			[
				'ngRoute',
				'ngAnimate',
				'ngMessages',
				'Andrello.common',
				'Andrello.storyboard'
			]);

	angular
		.module('Andrello')
		.config(andrelloConfig);

	andrelloConfig.$inject = ['$routeProvider', '$httpProvider', '$provide'];

	function andrelloConfig($routeProvider, $httpProvider, $provide)
	{
		$routeProvider
			.when('/',
			{
				templateUrl: '/storyboard/tmpl/storyboard.html',
				controller: 'StoryboardController',
				controllerAs: 'storyboard'
			})
			.when('/dashboard',
			{
				templateUrl: '/dashboard/tmpl/dashboard.html',
				controller: 'DashboardController',
				controllerAs: 'dashboard'
			})
			.when('/users',
			{
				templateUrl: '/users/tmpl/users.html',
				controller: 'UsersController',
				controllerAs: 'users'
			})
			.when('/users/:userId',
			{
				templateUrl: '/users/tmpl/user.html',
				controller: 'UserController',
				controllerAs: 'user'
			})
			.when('/login',
			{
				templateUrl: '/login/tmpl/login.html',
				controller: 'LoginController',
				controllerAs: 'login'
			})
			.otherwise(
			{
				redirectTo: '/'
			});

		// Interceptor
		$httpProvider.interceptors.push('loadingInterceptor');

		// Decorator
		$provide.decorator('$log', logDecorator);

		function logDecorator($delegate)
		{
			var debugFn = $delegate.debug;

			$delegate.debug = debug;

			return $delegate;

			function debug()
			{
				// Prepend timestamp
				arguments[0] = timeStamp()+' : '+arguments[0];

				// Call the original with output prepended with formatted timestamp
				debugFn.apply(null, arguments);
			}

			function timeStamp()
			{
				var tz = jstz.determine().name();

				return moment.tz(tz).format('YYYY/MM/DD HH:mm:ss.SSS z');
			}
		}
	}
})();
