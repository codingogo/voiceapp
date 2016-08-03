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

  $scope.articles = Articles.all();
  
  $ionicModal.fromTemplateUrl('templates/feed-player.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.state = { selected: undefined};
  $scope.togglePlay = function(article, idx){
    $scope.audioPlayer = true;
    $scope.feed = article;
    $scope.state.selected = ($scope.state.selected != idx ? idx : undefined);
    if($scope.state.selected !== idx){
      $scope.audioPlayer = false;
    }
  };

  $scope.closePlayer = function() {
    $scope.audioPlayer = false;
    $scope.state = { selected: undefined};
  }

  $scope.openPlayerLg = function(feed){
    $scope.modal.show(feed);
  };

  $scope.closePlayerModal = function() {
    $scope.modal.hide();
  };

  $scope.addArticle = function(article) {
    $scope.addLike = false;
  }

  $scope.removeArticle = function(article) {
    $scope.addLike = true;
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