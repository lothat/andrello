(function storyboardController()
{
	'use strict';

	angular
		.module('Andrello.storyboard')
		.controller('StoryboardController', StoryboardController);

	StoryboardController.$inject = ['$scope','$log', 'StoriesModel', 'STORY_TYPES', 'STORY_STATUSES'];

	function StoryboardController($scope, $log, StoriesModel, STORY_TYPES, STORY_STATUSES)
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

		// methods for drag-and-drop
		storyboard.insertAdjacent = insertAdjacent;
		storyboard.finalizeDrop = finalizeDrop;
		storyboard.changeStatus = changeStatus;

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

		$scope.$on('storyDeleted', storyDeleted);

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

		function storyDeleted()
		{
			storyboard.getStories();
			storyboard.resetForm();
		}

		function resetForm()
		{
			storyboard.currentStory = null;
			storyboard.editedStory = {};
			storyboard.detailsForm.$setPristine();
			storyboard.detailsForm.$setUntouched();
		}

		function insertAdjacent(target, story, insertBefore)
		{
			var fromIdx;
			var toIdx;

			if (target===story)
			{
				return;
			}

			fromIdx = storyboard.stories.indexOf(story);
			toIdx = storyboard.stories.indexOf(target);

			if (!insertBefore)
			{
				toIdx = toIdx + 1;
			}

			if (fromIdx >= 0 && toIdx >= 0)
			{
				storyboard.stories.splice(fromIdx, 1);

				if (toIdx >= fromIdx)
				{
					toIdx = toIdx-1;
				}

				storyboard.stories.splice(toIdx, 0, story);
			}
		}

		function finalizeDrop(story)
		{
			StoriesModel.update(story.id, story).then(
				function successCallback(result)
				{
					$log.debug('RESULT', result);
				},
				function errorCallback(reason)
				{
					$log.debug('REASON', reason);
				});
		}

		function changeStatus(story, status)
		{
			story.status = status.name;
		}

		// temporary utility function to mock up new IDs.
		// IDs would normally be generated on insert into the database
		function newID()
		{
			return '_'+Math.random().toString(36).substr(2, 9);
		}
	}
})();
