AppCtrl
.controller('PlaylistsCtrl', function($scope, Articles, $ionicModal, $stateParams) {
  var initialize = function() {
    $scope.addLike = true;
    $scope.audioPlayer = false;
    $scope.playing = false; 
  }; 

  if ($stateParams.category != '' || $stateParams.category == undefined) {
    $scope.categoryFilter = $stateParams.category;
  } else {
    $scope.categoryFilter = '';
  }

  $scope.toggleLike = function(articleId) {
    $scope.addLike = !$scope.addLike;
  };

  $scope.play = function(article){
    $scope.audioPlayer = true;
    $scope.feed = article;
  };

  $scope.openPlayerLg = function(feed){
    $scope.modal.show(feed);
  };

  $scope.articles = Articles.all();
  
  $ionicModal.fromTemplateUrl('templates/feed-player.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.closePlayerModal = function() {
    $scope.modal.hide();
  };

  $scope.closePlayer = function() {
    $scope.audioPlayer = false;
  }

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

.controller('AudioplayerCtrl', function($scope, $stateParams, Articles){

});