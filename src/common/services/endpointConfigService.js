(function endpointConfigService()
{
	'use strict';

	angular.module('Andrello.common')

		// .constant('CURRENT_BACKEND', 'node')
		// .constant('CURRENT_BACKEND', 'firebase')

		.service('EndpointConfigService', EndpointConfigService);

	function EndpointConfigService($rootScope)
	{
		var service = this;
		/* var endpointMap = {
			firebase:
			{
				URI: 'https://my-first-angello.firebaseio.com/',
				root: 'clients/',
				format: '.json'
			},
			node:
			{
				URI: 'http://localhost:3000/',
				root: 'api/',
				format: ''
			}
		}; */

		// var currentEndpoint = endpointMap[CURRENT_BACKEND],

		var currentEndpoint =
		{
			URI: 'http://localhost:3000/',
			root: 'api/',
			format: ''
		};

		var backend = 'node';

		service.getUrl = getUrl;
		service.getUrlForId = getUrlForId;
		service.getCurrentBackend = getCurrentBackend;
		service.getCurrentFormat = getCurrentFormat;
		service.getCurrentURI = getCurrentURI;

		function getUrl(model)
		{
			return currentEndpoint.URI + currentEndpoint.root + model;
		}

		function getUrlForId(model, id)
		{
			return getUrl(model) + id + currentEndpoint.format;
		}

		function getCurrentBackend()
		{
			return backend;
		}

		function getCurrentFormat()
		{
			return currentEndpoint.format;
		}

		function getCurrentURI()
		{
			return currentEndpoint.URI;
		}
	}
})();
