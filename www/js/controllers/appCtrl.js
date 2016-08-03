var AppCtrl = angular.module('odi.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $rootScope, $ionicSideMenuDelegate, $state) {
  $scope.user = false;
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.closeLogin = function() {
    $scope.modal.hide();  
  };

  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.logout = function() {
    $scope.user = false;
    $rootScope.user = false;
    $ionicSideMenuDelegate.toggleRight(false); 
    $state.go('app.categories'); 
  };

  $scope.loginFacebook = function() {
    var ref = new Firebase("https://odi.firebaseio.com");
    ref.authWithOAuthPopup("facebook", function(error, user){
      if(error){
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", user);
        $scope.$apply(function() {
          $scope.user = user;
          $rootScope.user = user;
          $scope.user.avatar = user.facebook.profileImageURL;
          $scope.user.name = user.facebook.displayName;
          $state.go('app.categories');
        })
      }
    });
    
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  $scope.loginTwitter = function() {
    var ref = new Firebase("https://odi.firebaseio.com");
    ref.authWithOAuthPopup("twitter", function(error, user){
      if(error){
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", user);
        $scope.$apply(function() {
          $scope.user = user;
          $rootScope.user = user;
          $scope.user.avatar = user.twitter.profileImageURL;
          $scope.user.name = user.twitter.displayName;
          $state.go('app.categories');
        })
      }
    });
    
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };  
});







