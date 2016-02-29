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

	function andrelloConfig($routeProvider)
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
	}
})();
