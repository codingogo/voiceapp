angular.module('odi.controllers')
.controller('PlaylistsCtrl',['$scope', 'Articles', '$ionicModal', '$stateParams', '$rootScope', 'MediaManager', function($scope, Articles, $ionicModal, $stateParams, $rootScope, MediaManager) {
  var initialize = function() {
    $scope.addLike = true;
    $scope.audioPlayer = false;
    $scope.playing = false; 
    $scope.state = { selected: undefined};
    $scope.addState = { selected: undefined};   
  }; 

  if ($stateParams.category != '' || $stateParams.category == undefined) {
    $scope.categoryFilter = $stateParams.category;
  } else {
    $scope.categoryFilter = '';
  }

  $scope.articles = Articles.all();

  $ionicModal.fromTemplateUrl('templates/feed-player.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.togglePlay = function(article, idx){
    $scope.audioPlayer = true;
    $scope.feed = article;
    $scope.state.selected = ($scope.state.selected != idx ? idx : undefined);
    if($scope.state.selected !== idx){
      $scope.audioPlayer = false;
    }
  };

  $scope.addArticle = function(article, idx, user) {
    $scope.addState.selected = ($scope.addState.selected != idx ? idx : undefined);
    if($scope.addState.selected !== idx){
      $scope.addLike = true;
    }
    var userId = user.uid;
    Articles.addPlaylist(article, userId);
  }

  $scope.openPlayerLg = function(feed){
    $scope.modal.show(feed);
  };

  // bind stop button in view
  $scope.stopPlayback = function() {
    MediaManager.stop();
    
    $scope.audioPlayer = false;
    $scope.state = { selected: undefined};    
  };

  // stop any track before leaving current view
  $scope.$on('$ionicView.beforeLeave', function() {
    MediaManager.stop();
  });

  $scope.closePlayerModal = function() {
    $scope.modal.hide();
  };

  $scope.removeArticle = function(article) {
    $scope.addLike = true;
  }

  $scope.closePlayer = function() {
    $scope.audioPlayer = false;
    $scope.state = { selected: undefined};
  }  

  initialize();
}])


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
});