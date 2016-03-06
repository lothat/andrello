(function storyStatusValue()
{
	'use strict';

	angular
		.module('Andrello')
		.value('STORY_STATUSES',
		[
			{name: 'To Do'},
			{name: 'In Progress'},
			{name: 'Code Review'},
			{name: 'QA Review'},
			{name: 'Verified'}
		]);
})();
