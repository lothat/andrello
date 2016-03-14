(function storiesModel()
{
	'use strict';

	angular
		.module('Andrello.common')
		.factory('StoriesModel', StoriesModel);

	StoriesModel.$inject = ['$http', '$q', 'EndpointConfigService'/*, 'UtilsService'*/];

	function StoriesModel($http, $q, EndpointConfigService/*, UtilsService*/)
	{
		var MODEL = 'stories/';
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
			var url = EndpointConfigService.getUrlForId(MODEL +
					EndpointConfigService.getCurrentFormat(), storyid);

			console.log('GET ', url);

			return $http.get(url);
		}

		function create(story)
		{
			var url = EndpointConfigService.getUrl(MODEL +
					EndpointConfigService.getCurrentFormat());

			console.log('POST ', url);
			console.log(story);

			return $http.post(url, story);
		}

		function update(storyid, story)
		{
			var url = EndpointConfigService.getUrlForId(MODEL +
					EndpointConfigService.getCurrentFormat(), storyid);

			console.log('PUT ', url);
			console.log(story);

			return $http.put(url, story);
		}

		function destroy(storyid)
		{
			var url = EndpointConfigService.getUrlForId(MODEL +
					EndpointConfigService.getCurrentFormat(), storyid);

			console.log('DELETE ', url);

			return $http.delete(url);
		}
	}
})();
