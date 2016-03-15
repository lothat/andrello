(function dropTargetDirective()
{
	'use strict';

	angular
		.module('Andrello.storyboard')
		.directive('dropTarget', dropTargetFactory);

	dropTargetFactory.$inject = ['$parse'];

	function dropTargetFactory($parse)
	{
		var directive =
		{
			restrict: 'A',
			require: ['dropTarget', '^dropContainer'],
			controller: 'DropTargetController',
			controllerAs: 'dropTarget',
			link: dropTargetLink
		};

		return directive;

		function dropTargetLink(scope, element, attrs, controllers)
		{
			var dropTarget = controllers[0];
			var dropContainer = controllers[1];
			var anchor = attrs.dropTarget || 'center';

			var destroy = dropContainer.removeDropTarget.bind(dropContainer, anchor);

			var callbacks =
			{
				onDragEnter: $parse(attrs.onDragEnter),
				onDragOver: $parse(attrs.onDragOver),
				onDragLeave: $parse(attrs.onDragLeave),
				onDrop: $parse(attrs.onDrop)
			};

			element.addClass('drop-target drop-target-'+anchor);

			dropTarget.init(element, scope, callbacks);
			dropContainer.addDropTarget(anchor, dropTarget);

			scope.$on('destroy', destroy);
		}
	}
})();
