angular.module('jupiterApp').controller('navBarLoginCtrl',function($scope,$http,ngIdentity,ngNotifier,ngAuth,$location,$modal,$window){ 
	$scope.identity = ngIdentity;



	$scope.signin = function(email, password){
		ngAuth.authenticateUser(email,password).then(function(success) {
			
			if(success) {
				if($scope.identity.currentUser.isLevelTwo()){
					$location.path('/adminCRQueue');
				}
				else if ($scope.identity.currentUser.isLevelOne()) {
					$location.path('/adminRights');
				}
				else if ($scope.identity.currentUser.isLevelThree()){
					$location.path('/adminCREdit');
				}
				$scope.ok();

			} else {
				ngNotifier.notifyError('Incorrect Email/Password');
			}
		});
	}


	
    if($scope.identity.isAuthenticated()){

      $scope.signInBtn = true;
    } else if (!$scope.identity.isAuthenticated()){
      
    $scope.signInBtn = false;
    $scope.toggleSignInBtn = function() {
        $scope.signInBtn = $scope.signInBtn === false ? true: false;
    };
    }

	$scope.pivLogin = function(){   //only function is to kick off the switch to HTTPS for Certificate Authentication
		//todo
	   	var forceSsl = function () {
			$window.location.href = $location.absUrl().replace('http','https').replace('8089','4400');
		 };
		var protocol = $location.protocol();

		if($location.protocol() != 'https'){
			forceSsl();
		}
		
	}

	$scope.signout = function(){
		ngAuth.logoutUser().then(function() {
			$scope.email = "";
			$scope.password = "";
			if($location.protocol()=='https'){
				$window.location = $location.absUrl().replace('https','http').replace('4400','8089');
			}
			else{
				$location.path('/');
			}
		})
	}

	$scope.openLogin = function (size) {

      var modalInstance = $modal.open({
        templateUrl: '/partials/modals/login',
        controller: LoginModalInstanceCtrl,
        size: size
      });
    
  	}


});

var LoginModalInstanceCtrl = function ($scope, $modalInstance) {

  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};



