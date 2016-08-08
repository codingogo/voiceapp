AppCtrl
.controller('SavedListCtrl', function($scope, Articles, $ionicModal, $stateParams, $rootScope, MediaManager) {
  var initialize = function() {
    $scope.audioPlayer = false;
    $scope.playing = false; 
    $scope.state = { selected: undefined};
    $scope.addState = { selected: undefined};  
  }; 

  // query user's articles
  if ($rootScope.user){
    if($rootScope.user.facebook){
      var userId = $rootScope.user.facebook.id;
    }
    if($rootScope.user.twitter){
      var userId = $rootScope.user.twitter.id;
    }
    var ref = new Firebase('https://odi.firebaseio.com/myplaylist');
    ref.child(userId).on('value', (snapshot) => {
      var playlistVal = snapshot.val();
      var playlist = _(playlistVal).keys().map((playlistKey) => {
        var item = _.clone(playlistVal[playlistKey]);
        item.key = playlistKey;
        return item
      })
      .value();
      $scope.articles = playlist;
    })
  }

  $scope.play = function(article, idx){
    $scope.audioPlayer = true;
    $scope.feed = article;
    $scope.state.selected = ($scope.state.selected != idx ? idx : undefined);
    if($scope.state.selected !== idx){
      $scope.audioPlayer = false;
    }
  };  

  $scope.removeArticle = function(article) {
    var articleId = article.key;
    ref.child(userId).child(articleId).set(null);
  };

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

  $scope.closePlayer = function() {
    $scope.audioPlayer = false;
    $scope.state = { selected: undefined};
  };  

  initialize();  
});