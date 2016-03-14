(function draggingService()
{
	'use strict';

	angular
		.module('Andrello.storyboard')
		.factory('$dragging', draggingFactory);

	function draggingFactory()
	{
		var data = null;
		var type = null;
		var service =
		{
			getData: getData,
			getType: getType,
			setData: setData,
			setType: setType
		};

		return service;

		function getData()
		{
			return data;
		}

		function getType()
		{
			return type;
		}

		function setData(newData)
		{
			data = newData;

			return data;
		}

		function setType(newType)
		{
			type = newType;

			return type;
		}
	}
})();
