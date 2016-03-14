(function userstoryDirective()
{
	'use strict';

	angular
		.module('Andrello.user')
		.directive('userstory', userstory);

	userstory.$inject = [];

	function userstory()
	{
		var directive =
		{
			restrict: 'A',
			controller: 'UserstoryController',
			controllerAs: 'userStory',
			link: userStoryLink
		};

		return directive;
	}

	function userStoryLink(scope, element /* , attrs */)
	{
		element
			.mouseover(onMouseover)
			.mouseout(onMouseout);

		function onMouseover()
		{
			element.css({ 'opacity': 0.9});
		}

		function onMouseout()
		{
			element.css({ 'opacity': 1.0});
		}
	}
})();
