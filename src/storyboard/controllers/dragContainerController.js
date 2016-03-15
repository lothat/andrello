(function dragContainerController()
{
	'use strict';

	angular
		.module('Andrello.storyboard')
		.controller('DragContainerController', DragContainerController);

	DragContainerController.$inject = ['$dragging'];

	function DragContainerController($dragging)
	{
		var dragContainer = this;

		dragContainer.init = init;
		dragContainer.handleDragStart = handleDragStart;
		dragContainer.handleDragEnd = handleDragEnd;
		dragContainer.updateDragData = updateDragData;
		dragContainer.updateDragType = updateDragType;

		function init(elem)
		{
			dragContainer.elem = elem;
		}

		function handleDragStart(evt)
		{
			if (evt.originalEvent)
			{
				evt = evt.originalEvent;
			}

			evt.dataTransfer.dropEffect = 'move';
			evt.dataTransfer.effectAllowed = 'move';

			dragContainer.elem.addClass('drag-container-active');
			dragContainer.dragging = true;

			$dragging.setData(dragContainer.data);
			$dragging.setType(dragContainer.type);
		}

		function handleDragEnd(evt)
		{
			if (evt.originalEvent)
			{
				evt = evt.originalEvent;
			}

			angular.element(evt.target)
				.removeClass('drag-active');

			dragContainer.elem.removeClass('drag-container-active');
			dragContainer.dragging = false;

			$dragging.setData(null);
			$dragging.setType(null);
		}

		function updateDragData(newData)
		{
			dragContainer.data = newData;

			if (dragContainer.dragging)
			{
				$dragging.setData(dragContainer.data);
			}
		}

		function updateDragType(newType)
		{
			dragContainer.type = newType || 'text/x-drag-and-drop';

			if (dragContainer.dragging)
			{
				$dragging.setType(dragContainer.type);
			}
		}
	}
})();
