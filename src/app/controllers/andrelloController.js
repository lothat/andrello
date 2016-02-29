(function andrelloController()
{
	'use strict';

	angular
		.module('Andrello')
		.controller('AndrelloController', AndrelloController);

	function AndrelloController()
	{
		var andrello = this;

		andrello.currentUser =
		{
			id: 0,
			name: 'Andrew Loth'
		};
	}
})();
