angular.module('odi.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  // Users
  $scope.createUser = function(user){

  };

  $scope.signIn = function() {
    $state.go('app.categories');
  }
})

.controller('PlaylistsCtrl', function($scope, Articles) {
  var initialize = function() {
    $scope.addLike = true;
  }
  $scope.toggleLike = function(articleId) {
    $scope.addLike = !$scope.addLike;
  }
  $scope.articles = Articles.all();

  initialize();
})


.controller('PlaylistCtrl', function($scope, $stateParams, Articles) {
  var initialize = function() {
    $scope.addLike = true;
  };
  $scope.article = Articles.get($stateParams.articleId);
  $scope.article.shortTitle = Articles.get($stateParams.articleId).title.substring(0,18)+'...';
  $scope.toggleLike = function(articleId) {
    $scope.addLike = !$scope.addLike;
  };

  initialize();
})

.controller('CategoriesCtrl', function($scope) {
  $scope.categories = [
    {
      id: 0, title: 'TRAVEL', imageUrl:"http://media3.s-nbcnews.com/j/MSNBC/Components/Photo/_new/110421-nat-forest2-hmed.grid-10x2.jpg"
    },{
      id: 1, title: 'HEALTH', imageUrl:"https://pixabay.com/static/uploads/photo/2015/03/26/10/05/avocado-690898_960_720.jpg"
    },{
      id: 2, title: 'MUSIC', imageUrl:"http://i0.wp.com/www.themusiczoo.com/blog/wp-content/uploads/2015/03/carousel-image1.jpg?resize=500%2C250"
    },{
      id: 3, title: 'SPORTS', imageUrl:"https://s-media-cache-ak0.pinimg.com/originals/21/99/fb/2199fbc6b13e7ed41d1e804217b79718.jpg"
    },{
      id: 4, title: 'SPACE', imageUrl:"https://pixabay.com/static/uploads/photo/2015/10/12/14/59/milky-way-984050_960_720.jpg"
    }
  ]
});







