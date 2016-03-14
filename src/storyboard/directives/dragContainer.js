(function dragContainerDirective()
{
	'use strict';

	angular
		.module('Andrello.storyboard')
		.directive('dragContainer', dragContainerFactory);

	function dragContainerFactory()
	{
		var directive =
		{
			restrict: 'A',
			controller: 'DragContainerController',
			controllerAs: 'dragContainer',
			link: dragContainerLink
		};

		return directive;

		function dragContainerLink(scope, element, attrs, dragContainer)
		{
			dragContainer.init(element);

			element.on('dragstart', dragContainer.handleDragStart.bind(dragContainer));
			element.on('dragend', dragContainer.handleDragEnd.bind(dragContainer));
			scope.$watch(attrs.dragContainer, dragContainer.updateDragData.bind(dragContainer));
			attrs.$observe('mimeType', dragContainer.updateDragType.bind(dragContainer));
			attrs.$set('draggable', true);
		}
	}
})();
