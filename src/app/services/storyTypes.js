(function storyTypesValue()
{
	'use strict';

	angular
		.module('Andrello')
		.value('STORY_TYPES',
		[
			{name: 'Feature'},
			{name: 'Enhancement'},
			{name: 'Bug'},
			{name: 'Spike'}
		]);
})();
