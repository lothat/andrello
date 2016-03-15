(function dropContainerDirective()
{
	'use strict';

	angular
		.module('Andrello.storyboard')
		.directive('dropContainer', dropContainerFactory);

	dropContainerFactory.$inject = ['$document','$parse'];

	function dropContainerFactory($document,$parse)
	{
		var directive =
		{
			restrict: 'A',
			controller: 'DropContainerController',
			controllerAs: 'dropContainer',
			link: dropContainerLink
		};

		return directive;

		function dropContainerLink(scope, element, attrs, dropContainer)
		{
			var dragEnd = dropContainer.handleDragEnd.bind(dropContainer);
			var handleDragEnter = bindTo('DragEnter');
			var handleDragOver = bindTo('DragOver');
			var handleDragLeave = bindTo('DragLeave');
			var handleDrop = bindTo('Drop');

			var callbacks =
			{
				onDragEnter: $parse(attrs.onDragEnter),
				onDragOver: $parse(attrs.onDragOver),
				onDragLeave: $parse(attrs.onDragLeave),
				onDrop: $parse(attrs.onDrop)
			};

			dropContainer.init(element, scope, callbacks);

			element.on('dragenter', handleDragEnter);
			element.on('dragover', handleDragOver);
			element.on('dragleave', handleDragLeave);
			element.on('drop', handleDrop);

			scope.$watch(attrs.accepts,
				dropContainer.updateMimeTypes.bind(dropContainer));

			$document.on('dragend', dragEnd);

			scope.$on('$destroy', onDestroy);

			function onDestroy()
			{
				$document.off('dragend', dragEnd);
			}

			function bindTo(event)
			{
				return applyEvent;

				function applyEvent(e)
				{
					scope.$apply(applyCallback);

					function applyCallback()
					{
						return dropContainer['handle' + event](e);
					}
				}
			}
		}
	}
})();
