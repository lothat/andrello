(function()
{
	'use strict';

	angular
		.module('Andrello',
			[
				'ngRoute',
				'ngAnimate',
				'ngMessages',
				'Andrello.common'
			]);

	angular
		.module('Andrello')
		.config(andrelloConfig);

	function andrelloConfig($routeProvider)
	{
		$routeProvider
			.when('/',
			{
				templateUrl: 'src/angello/storyboard/tmpl/storyboard.html',
				controller: 'StoryboardController',
				controllerAs: 'storyboard'
			})
			.when('/dashboard',
			{
				templateUrl: 'src/angello/dashboard/tmpl/dashboard.html',
				controller: 'DashboardController',
				controllerAs: 'dashboard'
			})
			.when('/users',
			{
				templateUrl: 'src/angello/users/tmpl/users.html',
				controller: 'UsersController',
				controllerAs: 'users'
			})
			.when('/users/:userId',
			{
				templateUrl: 'src/angello/users/tmpl/user.html',
				controller: 'UserController',
				controllerAs: 'user'
			})
			.when('/login',
			{
				templateUrl: 'src/angello/login/tmpl/login.html',
				controller: 'LoginController',
				controllerAs: 'login'
			})
			.otherwise(
			{
				redirectTo: '/'
			});
	}
})();