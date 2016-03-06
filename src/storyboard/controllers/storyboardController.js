(function storyboardController()
{
	'use strict';

	angular
		.module('Andrello.storyboard')
		.controller('StoryboardController', StoryboardController);

	StoryboardController.$inject = ['$log', 'StoriesModel', 'STORY_TYPES', 'STORY_STATUSES'];

	function StoryboardController($log, StoriesModel, STORY_TYPES, STORY_STATUSES)
	{
		var storyboard = this;

		storyboard.currentStory = null;
		storyboard.editedStory = {};
		storyboard.setCurrentStory = setCurrentStory;
		storyboard.createStory = createStory;
		storyboard.getStories = getStories;
		storyboard.updateStory = updateStory;
		storyboard.updateCancel = updateCancel;
		storyboard.deleteStory = deleteStory;
		storyboard.resetForm = resetForm;

		storyboard.statuses = STORY_STATUSES;
		storyboard.types = STORY_TYPES;

		/*
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
		*/

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

		storyboard.getStories();

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

		function getStories()
		{
			StoriesModel.all()
				.then(function successCallback(result)
				{
					storyboard.stories = (result!==null)?result:{};

					$log.debug('RESULT', result);
				},
				function errorCallback(reason)
				{
					$log.debug('REASON', reason);
				});
		}

		function updateStory()
		{
			StoriesModel.update(storyboard.editedStory).then(
				function successCallback(result)
				{
					storyboard.getStories();
					storyboard.resetForm();
				},
				function errorCallback(reason)
				{
					console.log(reason);
				});
			/*
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
			*/
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
