angular.module('odi.controllers')
.controller('MylistCtrl', function($scope, Articles, $ionicModal, $stateParams, $rootScope, MediaManager, Auth) {
  var initialize = function() {
    $scope.audioPlayer = false;
    $scope.playing = false; 
    $scope.state = { selected: undefined};
    $scope.addState = { selected: undefined};  
    var userId;
  }; 
  var ref = new Firebase('https://odi.firebaseio.com/myplaylist');

  $scope.auth = Auth;
  $scope.auth.$onAuth(function(authData) {
    $scope.authData = authData;
    console.log('authdata', $scope.authData);
    userId = authData.uid;

    ref.child(userId).on('value', function(snapshot) {
      var playlistVal = snapshot.val();
      var playlist = _(playlistVal).keys().map(function(playlistKey) {
        var item = _.clone(playlistVal[playlistKey]);
        item.key = playlistKey;
        return item
      })
      .value();
      $scope.articles = playlist;
      $scope.$apply();
    })
  });

  $scope.play = function(article, idx){
    $scope.audioPlayer = true;
    $scope.feed = article;
    $scope.state.selected = ($scope.state.selected != idx ? idx : undefined);
    if($scope.state.selected !== idx){
      $scope.audioPlayer = false;
    };
  };  

  $scope.removeArticle = function(article) {
    var articleId = article.key;
    return ref.child(userId).child(articleId).set(null);
  };

  $scope.openPlayerLg = function(feed){
    return $scope.modal.show(feed);
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