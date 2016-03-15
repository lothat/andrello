(function dropTargetController()
{
	'use strict';

	angular
		.module('Andrello.storyboard')
		.controller('DropTargetController', DropTargetController);

	function DropTargetController()
	{
		var dropTarget = this;

		dropTarget.init = init;
		dropTarget.handleDragEnter = handleDragEnter;
		dropTarget.handleDragOver = handleDragOver;
		dropTarget.handleDragLeave = handleDragLeave;
		dropTarget.handleDrop = handleDrop;

		function init(element, scope, callbacks)
		{
			dropTarget.element = element;
			dropTarget.scope = scope;
			dropTarget.callbacks = callbacks;
		}

		function handleDragEnter(eventData)
		{
			dropTarget.element.addClass('drop-target-active');

			if (dropTarget.callbacks.onDragEnter)
			{
				dropTarget.callbacks.onDragEnter(dropTarget.scope, eventData);
			}
		}

		function handleDragOver(eventData)
		{
			if (dropTarget.callbacks.onDragOver)
			{
				dropTarget.callbacks.onDragOver(dropTarget.scope, eventData);
			}
		}

		function handleDragLeave(eventData)
		{
			dropTarget.element.removeClass('drop-target-active');

			if (dropTarget.callbacks.onDragLeave)
			{
				dropTarget.callbacks.onDragLeave(dropTarget.scope, eventData);
			}
		}

		function handleDrop(eventData)
		{
			if (dropTarget.callbacks.onDrop)
			{
				dropTarget.callbacks.onDrop(dropTarget.scope, eventData);
			}
		}
	}
})();
