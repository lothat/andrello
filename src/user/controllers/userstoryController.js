(function userstoryController()
{
	'use strict';

	angular
		.module('Andrello.user')
		.controller('UserstoryController', UserstoryController);

	UserstoryController.$inject = ['$rootScope', 'StoriesModel', '$log'];

	function UserstoryController($rootScope, StoriesModel, $log)
	{
		var userStory = this;

		userStory.deleteStory = deleteStory;

		function deleteStory(storyId)
		{
			StoriesModel.destroy(storyId)
				.then(function successCallback(result)
				{
					$rootScope.$broadcast('storyDeleted');
					$log.debug('RESULT', result);
				},
				function errorCallback(reason)
				{
					$log.debug('ERROR', reason);
				});
		}
	}
})();
