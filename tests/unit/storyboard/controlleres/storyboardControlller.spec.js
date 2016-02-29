'use strict';

describe('StoryboardController', function describeStoryboardController()
{
	var ctrl;

	beforeEach(module('Andrello.storyboard'));
	beforeEach(inject(function injectController($controller)
	{
		ctrl = $controller('StoryboardController', {});
		ctrl.detailsForm =
		{
			$setPristine: function setPristine()
			{},
			$setUntouched: function setUntouched()
			{}
		};
	}));
	it('should reset the form', function testReset()
	{
		ctrl.editedStory = ctrl.currentStory = {assignee: '1'};
		ctrl.resetForm();

		expect(ctrl.currentStory).toBeNull();
		expect(ctrl.editedStory).toEqual({});
	});
	it('should delete a story', function testDelete()
	{
		var story = ctrl.stories[0];

		ctrl.deleteStory(story.id);

		expect(ctrl.stories).not.toContain(story);
	});
});
