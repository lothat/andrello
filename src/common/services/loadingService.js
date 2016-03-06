(function loadingServiceService()
{
	'use strict';

	angular
		.module('Andrello.common')
		.factory('LoadingService', loadingService);

	loadingService.$inject = ['rootScope'];

	function loadingService($rootScope)
	{
		var service =
		{
			setLoading: setLoading
		};

		return service;

		function setLoading(loading)
		{
			$rootScope.loadingView = loading;
		}
	}
})();
