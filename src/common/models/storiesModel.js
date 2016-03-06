(function storiesModel()
{
	'use strict';

	angular
		.module('Andrello.common')
		.factory('StoriesModel', StoriesModel);

	StoriesModel.$inject = ['$http', '$q', 'EndpointConfigService'/*, 'UtilsService'*/];

	function StoriesModel($http, $q, EndpointConfigService/*, UtilsService*/)
	{
		var MODEL = '/stories/';
		var service =
		{
			all: all,
			fetch: fetch,
			create: create,
			update: update,
			destroy: destroy
		};

		return service;

		function all()
		{
			var deferred = $q.defer();

			$http.get(
				EndpointConfigService.getUrl(MODEL +
					EndpointConfigService.getCurrentFormat()))
				.then(successCallback, errorCallback);

			return deferred.promise;

			function successCallback(response)
			{
				deferred.resolve(response.data);
			}

			function errorCallback(response)
			{
				deferred.reject(response);
			}
		}

		function fetch(storyid)
		{
			return $http.get(
				EndpointConfigService.getUrlForId(MODEL +
					EndpointConfigService.getCurrentFormat(), storyid));
		}

		function create(story)
		{
			return $http.post(
				EndpointConfigService.getUrl(MODEL +
					EndpointConfigService.getCurrentFormat()), story);
		}

		function update(storyid, story)
		{
			return $http.put(
				EndpointConfigService.getUrlForId(MODEL +
					EndpointConfigService.getCurrentFormat(), storyid),
				story);
		}

		function destroy(storyid)
		{
			return $http.delete(
				EndpointConfigService.getUrlForId(MODEL +
					EndpointConfigService.getCurrentFormat(), storyid));
		}
	}
})();
