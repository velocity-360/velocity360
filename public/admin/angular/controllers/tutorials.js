var app = angular.module('TutorialsModule', ['ngSanitize']);

app.controller('TutorialsController', ['$scope', 'generalService', 'accountService', 'uploadService', 'RestService', function($scope, generalService, accountService, uploadService, RestService) {
	$scope['generalService'] = generalService
	$scope.profile = null
	$scope.tutorials = null
	$scope.post = {
		title: '',
		youtube: '',
		package: '',
		description: ''
	},
	$scope.tutorial = {
		id: null,
		title: '',
		description: '',
		image: ''
	}
	
	$scope.init = function(){
		var request = $scope.generalService.parseLocation('admin')
		if (request.identifier == null){
			RestService.query({resource:'tutorial', id:null}, function(response){
				// console.log('TUTORIAL controller: '+JSON.stringify(response))
				if (response.confirmation != 'success'){
					alert(response.message);
					return;
				}

				$scope.tutorials = response.results
			})
			return
		}


		RestService.query({resource:'tutorial', id:request.identifier}, function(response){
			if (response.confirmation != 'success'){
				alert(response.message)
				return
			}

			$scope.tutorial = response.result
		})
	}

	$scope.uploadImage = function(files){
		var pkg = {'files':files, 'media':'images'}
		uploadPackage(pkg)
	}

	function uploadPackage(pkg){
		uploadService.uploadFiles(pkg, function(response, error){
			if (error){
				alert(error.message)
				return
			}

			console.log('UPLOAD: '+JSON.stringify(response))
			if (pkg.media == 'images'){
				var image = response.image
				$scope.tutorial['image'] = image.id
				$scope.updateTutorial(null)
			}
		})
	}

	$scope.addPost = function(){
		$scope.tutorial.posts.push($scope.post)
		$scope.updateTutorial(function(){
			$scope.post = {
				title: '',
				youtube: '',
				package: '',
				description: ''
			}
		})
	}

	$scope.selectPost = function(post){
		$scope.post = post
	}

	$scope.removePost = function(post){
		var index = $scope.tutorial.posts.indexOf(post)
		$scope.tutorial.posts.splice(index, 1)
		if (index != -1)
			$scope.updateTutorial(null)
	}

	$scope.updateTutorial = function(completion){
		if ($scope.tutorial.id == null)
			return
		
		RestService.put({resource:'tutorial', id:$scope.tutorial.id}, $scope.tutorial, function(response){
			if (response.confirmation != 'success'){
				alert(response.message)
				return
			}

			console.log('Update tutorial: '+JSON.stringify(response))
			$scope.tutorial = response.result
			alert('Tutorial Updated')
			if (completion != null)
				completion()
		})
	}

	$scope.createTutorial = function(completion){
		RestService.post({resource:'tutorial'}, $scope.tutorial, function(response){
			if (response.confirmation != 'success'){
				alert(response.message)
				return
			}

			console.log('CREATE TUTORIAL: '+JSON.stringify(response))
			$scope.tutorials.push(response.result)
			$scope.tutorial = {
				id: null,
				title: '',
				description: '',
				image: ''
			}

			if (completion != null)
				completion()
		})
	}


	$scope.removeTutorial = function(){
		if ($scope.tutorial.id == null)
			return

		RestService.delete({resource:'tutorial', id:$scope.tutorial.id}, function(response){
			if (response.confirmation != 'success'){
				alert(response.message)
				return
			}

			console.log('DELETE EVENT: '+JSON.stringify(response))
			RestService.query({resource:'tutorial', id:null}, function(response){
				if (response.confirmation != 'success'){
					alert(response.message)
					return
				}

				$scope.tutorials = response.results
			})
		})
	}

}])
