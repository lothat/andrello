(function()
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
				templateUrl: 'src/storyboard/tmpl/storyboard.html',
				controller: 'StoryboardController',
				controllerAs: 'storyboard'
			})
			.when('/dashboard',
			{
				templateUrl: 'src/dashboard/tmpl/dashboard.html',
				controller: 'DashboardController',
				controllerAs: 'dashboard'
			})
			.when('/users',
			{
				templateUrl: 'src/users/tmpl/users.html',
				controller: 'UsersController',
				controllerAs: 'users'
			})
			.when('/users/:userId',
			{
				templateUrl: 'src/users/tmpl/user.html',
				controller: 'UserController',
				controllerAs: 'user'
			})
			.when('/login',
			{
				templateUrl: 'src/login/tmpl/login.html',
				controller: 'LoginController',
				controllerAs: 'login'
			})
			.otherwise(
			{
				redirectTo: '/'
			});
	}
})();