var AppCtrl = angular.module('odi.controllers', [])

.controller('AppCtrl',['$scope', '$ionicModal', '$timeout', '$rootScope', '$ionicSideMenuDelegate', '$state', 'Articles', function($scope, $ionicModal, $timeout, $rootScope, $ionicSideMenuDelegate, $state, Articles) {
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
    
    var ref = new Firebase('https://delb.firebaseio.com');
    ref.unauth();
    $state.go('app.categories'); 
    localStorage.clear();
    window.location.reload(true)
  };

  $scope.loginFacebook = function() {
    var ref = new Firebase("https://odi.firebaseio.com");
    ref.authWithOAuthPopup("facebook", function(error, authData){
      if(error){
        console.log("Login Failed!", error);
        return;
      } else {
        console.log("Authenticated successfully with payload:", authData);
        $scope.$apply(function() {
          $scope.user = authData;
          // $rootScope.user = authData;
          $scope.user.avatar = authData.facebook.profileImageURL;
          $scope.user.name = authData.facebook.displayName;
          $state.go('app.categories');
        });

        var user = {
          id: authData.uid,
          name: authData.facebook.displayName,
          avatar: authData.facebook.profileImageURL,
          locale: authData.facebook.cachedUserProfile.locale,
          link: authData.facebook.cachedUserProfile.link,
          picture: authData.facebook.cachedUserProfile.picture,
          timestamp: Firebase.ServerValue.TIMESTAMP,
          source: 'facebook '
        };
        ref.child("users").child(authData.uid).update(user);
      };
    });
    
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  $scope.loginTwitter = function() {
    var ref = new Firebase("https://odi.firebaseio.com");
    ref.authWithOAuthPopup("twitter", function(error, authData){
      if(error){
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
        $scope.$apply(function() {
          $scope.user = authData;
          // $rootScope.user = authData;
          $scope.user.avatar = authData.twitter.profileImageURL;
          $scope.user.name = authData.twitter.displayName;
          $state.go('app.categories');
        });

        var user = {
          id: authData.uid,
          name: authData.twitter.displayName,
          avatar: authData.twitter.profileImageURL,
          locale: authData.twitter.cachedUserProfile.location,
          link: authData.twitter.cachedUserProfile.url,
          picture: authData.twitter.cachedUserProfile.profile_background_image_url,
          timestamp: Firebase.ServerValue.TIMESTAMP,
          source: 'twitter'
        };
        ref.child("users").child(authData.uid).update(user);       
      }
    });
    
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };  
}]);







