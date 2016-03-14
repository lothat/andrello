(function dropContainerController()
{
	'use strict';

	angular
		.module('Andrello.storyboard')
		.controller('DropContainerController', DropContainerController);

	DropContainerController.$inject = ['$dragging'];

	function DropContainerController($dragging)
	{
		var dropContainer = this;
		var targets = {};
		var validAnchors =
		[
			'center',
			'top',
			'top-right',
			'right',
			'bottom-right',
			'bottom',
			'bottom-left',
			'left',
			'top-left'
		];

		// var validAnchors = 'center top top-right right bottom-right bottom bottom-left left top-left'.split(' ');

		dropContainer.init = init;
		dropContainer.addDropTarget = addDropTarget;
		dropContainer.removeDropTarget = removeDropTarget;
		dropContainer.updateDragTarget = updateDragTarget;
		dropContainer.handleDragEnter = handleDragEnter;
		dropContainer.handleDragEnd = handleDragEnd;
		dropContainer.handleDragOver = handleDragOver;
		dropContainer.handleDragLeave = handleDragLeave;
		dropContainer.handleDrop = handleDrop;
		dropContainer.updateMimeTypes = updateMimeTypes;

		function init(element, scope, callbacks)
		{
			dropContainer.element = element;
			dropContainer.scope = scope;
			dropContainer.callbacks = callbacks;
			dropContainer.accepts = ['text/x-drag-and-drop'];
			dropContainer.element.addClass('drop-container');
		}

		function addDropTarget(anchor, dropTarget)
		{
			var idx = validAnchors.indexOf(anchor);

			if (idx < 0)
			{
				throw new Error('Invalid anchor point '+ anchor);
			}

			if (targets[anchor])
			{
				throw new Error('Duplicate drop targets for anchor '+anchor);
			}

			targets[anchor] = dropTarget;
		}

		function removeDropTarget(anchor)
		{
			if (targets[anchor] && targets[anchor] === anchor)
			{
				dropContainer.activeTarget = null;
			}

			delete targets[anchor];
		}

		function updateDragTarget(evt, skipUpdateTarget)
		{
			var activeTarget = null;
			var activeAnchor = null;
			var minDistanceSq = Number.MAX_VALUE;
			var prevAnchor = dropContainer.activeAnchor;
			var prevTarget = dropContainer.activeTarget;
			var eventData;

			if (evt.originalEvent)
			{
				evt = evt.originalEvent;
			}

			if (!skipUpdateTarget)
			{
				angular.forEach(targets, updateTarget);
			}

			dropContainer.activeAnchor = activeAnchor;
			dropContainer.activeTarget = activeTarget;

			eventData =
			{
				$event: evt,
				data: $dragging.getData(),
				anchor: activeAnchor,
				target: activeTarget,
				prevAnchor: prevAnchor,
				prevTarget: prevTarget
			};

			if (prevTarget!==activeTarget)
			{
				if (prevTarget)
				{
					dropContainer.element.removeClass('drop-container-active-'+prevAnchor);
					prevTarget.handleDragLeave(eventData);
				}

				if (activeTarget)
				{
					dropContainer.element.addClass('drop-container-active-'+activeAnchor);
					activeTarget.handleDragEnter(eventData);
				}
			}

			return eventData;

			function updateTarget(dropTarget, anchor)
			{
				var width = dropContainer.element[0].offsetWidth;
				var height = dropContainer.element[0].offsetHeight;
				var anchorX = width/2;
				var anchorY = height/2;
				var distanceSq;

				if (anchor.indexOf('left') >= 0)
				{
					anchorX = 0;
				}

				if (anchor.indexOf('top') >= 0)
				{
					anchorY = 0;
				}

				if (anchor.indexOf('bottom') >= 0)
				{
					anchorX = 0;
				}

				if (anchor.indexOf('right') >= 0)
				{
					anchorY = 0;
				}

				distanceSq = Math.pow(anchorX - evt.offsetX, 2) +
					Math.pow(anchorY - evt.offsetY, 2);

				if (distanceSq <  minDistanceSq)
				{
					activeAnchor = anchor;
					activeTarget = dropTarget;
					minDistanceSq = distanceSq;
				}
			}
		}

		function handleDragEnter(evt)
		{
			var eventData;

			if (evt.originalEvent)
			{
				evt = evt.originalEvent;
			}

			if (!dropContainer.accepts ||
				dropContainer.accepts.indexOf($dragging.getType()) >= 0)
			{
				evt.preventDefault();
			}
			else
			{
				return;
			}

			eventData = dropContainer.updateDragTarget(evt);

			dropContainer.element.children().css({'ponter-events':'none'});
			dropContainer.element.addClass('drop-container-active');

			if (dropContainer.callbacks.onDragEnter)
			{
				dropContainer.callbacks.onDragEnter(dropContainer.scope, eventData);
			}
		}

		function handleDragEnd(evt)
		{
			dropContainer.element.children().css({'ponter-events':null});
			dropContainer.element.removeClass('drop-container-active');
		}

		function handleDragOver(evt)
		{
			var eventData;

			if (evt.originalEvent)
			{
				evt = evt.originalEvent;
			}

			if (!dropContainer.accepts ||
				dropContainer.accepts.indexOf($dragging.getType()) >= 0)
			{
				evt.preventDefault();
			}
			else
			{
				return;
			}

			eventData = dropContainer.updateDragTarget(evt);

			if (eventData.target)
			{
				eventData.target.handleDragOver(eventData);
			}

			if (dropContainer.callbacks.onDragOver)
			{
				dropContainer.callbacks.onDragOver(dropContainer.scope, eventData);
			}
		}

		function handleDragLeave(evt)
		{
			var eventData;

			if (evt.originalEvent)
			{
				evt = evt.originalEvent;
			}

			if (!dropContainer.accepts ||
				dropContainer.accepts.indexOf($dragging.getType()) >= 0)
			{
				evt.preventDefault();
			}
			else
			{
				return;
			}

			eventData = dropContainer.updateDragTarget(evt, true);

			dropContainer.element.children().css({'ponter-events':null});
			dropContainer.element.removeClass('drop-container-active');

			if (dropContainer.callbacks.onDragLeave)
			{
				dropContainer.callbacks.onDragLeave(dropContainer.scope, eventData);
			}
		}

		function handleDrop(evt)
		{
			var eventData;

			if (evt.originalEvent)
			{
				evt = evt.originalEvent;
			}

			if (!dropContainer.accepts ||
				dropContainer.accepts.indexOf($dragging.getType()) >= 0)
			{
				evt.preventDefault();
			}
			else
			{
				return;
			}

			eventData = dropContainer.updateDragTarget(evt);

			if (eventData.target)
			{
				eventData.target.handleDrop(eventData);
			}

			if (dropContainer.callbacks.onDrop)
			{
				dropContainer.callbacks.onDrop(dropContainer.scope, eventData);
			}

			dropContainer.handleDragEnd(evt);
		}

		function updateMimeTypes(mimeTypes)
		{
			if (!mimeTypes)
			{
				mimeTypes = ['text/x-drag-and-drop'];
			}

			if (!angular.isArray(mimeTypes))
			{
				mimeTypes = [mimeTypes];
			}

			dropContainer.accepts = mimeTypes;
		}
	}
})();
