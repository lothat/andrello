(function storyboardController()
{
	'use strict';

	angular
		.module('Andrello.storyboard')
		.controller('StoryboardController', StoryboardController);

	StoryboardController.$inject = ['$scope'];

	function StoryboardController($scope)
	{
		var storyboard = this;

		storyboard.currentStory = null;
		storyboard.editedStory = {};
		storyboard.setCurrentStory = setCurrentStory;
		storyboard.createStory = createStory;
		storyboard.updateStory = updateStory;
		storyboard.updateCancel = updateCancel;
		storyboard.deleteStory = deleteStory;
		storyboard.resetForm = resetForm;

		storyboard.stories =
		[
			{
				'assignee': '1',
				'criteria': 'It tests!',
				'description': 'This is a test',
				'id': '1',
				'reporter': '2',
				'status': 'To Do',
				'title': 'First Story',
				'type': 'Spike'
			},
			{
				'assignee': '2',
				'criteria': 'It works!',
				'description': 'testing something',
				'id': '2',
				'reporter': '1',
				'status': 'In Progress',
				'title': 'Second Story',
				'type': 'Enhancement'
			}
		];
		storyboard.statuses = [
			{name: 'To Do'},
			{name: 'In Progress'},
			{name: 'Code Review'},
			{name: 'QA Review'},
			{name: 'Verified'}
		];
		storyboard.types =
		[
			{name: 'Spike'},
			{name: 'Enhancement'}
		];
		storyboard.users =
		[
			{
				id: '1',
				name: 'Andrew Loth'
			},
			{
				id: '2',
				name: 'Lukas Rubbelke'
			}
		];

		function setCurrentStory(story)
		{
			storyboard.currentStory = story;
			storyboard.editedStory = angular.copy(storyboard.currentStory);
		}

		function createStory()
		{
			var newStory = angular.copy(storyboard.editedStory);

			newStory.id = newID();

			storyboard.stories.push(newStory);
			storyboard.resetForm();
		}

		function updateStory()
		{
			var fields =
			[
				'title',
				'description',
				'criteria',
				'status',
				'type',
				'reporter',
				'assignee'
			];

			fields.forEach(function updateField(field)
			{
				storyboard.currentStory[field] = storyboard.editedStory[field];
			});

			storyboard.resetForm();
		}

		function updateCancel()
		{
			storyboard.resetForm();
		}

		function deleteStory(storyId)
		{
			storyboard.stories = storyboard.stories.filter(function findStory(story)
			{
				return story.id !== storyId;
			});
			storyboard.resetForm();
		}

		function resetForm()
		{
			storyboard.currentStory = null;
			storyboard.editedStory = {};
			storyboard.detailsForm.$setPristine();
			storyboard.detailsForm.$setUntouched();
		}

		// temporary utility function to mock up new IDs.
		// IDs would normally be generated on insert into the database
		function newID()
		{
			return '_'+Math.random().toString(36).substr(2, 9);
		}
	}
})();
