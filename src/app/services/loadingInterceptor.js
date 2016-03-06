(function loadingInterceptorService()
{
	'use strict';

	angular
		.module('Andrello')
		.factory('loadingInterceptor', loadingInterceptor);

	loadingInterceptor.$inject = ['LoadingService'];

	function loadingInterceptor(LoadingService)
	{
		var service =
		{
			request: loadingRequest,
			response: loadingResponse
		};

		return service;

		function loadingRequest(config)
		{
			LoadingService.setLoading(true);

			return config;
		}

		function loadingResponse(response)
		{
			LoadingService.setLoading(false);

			return response;
		}
	}
})();
