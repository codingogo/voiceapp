angular.module('odi.controllers')
.controller('MylistCtrl', function($scope, Articles, $ionicModal, $stateParams, $rootScope, MediaManager, Auth, FURL, $firebaseObject) {

  var initialize = function() {
    $scope.audioPlayer = false;
    $scope.playing = false; 
    $scope.state = { selected: undefined};
    $scope.addState = { selected: undefined};  
  }; 
  var userId;
  var ref = new Firebase(FURL);

  $scope.auth = Auth;
  $scope.auth.$onAuth(function(authData) {
    $scope.authData = authData;
    userId = authData.uid;

    ref.child('myplaylist').child(userId).on('value', function(snapshot) {
      var playlistVal = snapshot.val();
      var playlist = _(playlistVal).keys().map(function(playlistKey) {
        var item = _.clone(playlistVal[playlistKey]);
        item.key = playlistKey;
        return item;
      })
      .value();
      return $scope.articles = playlist.reverse();
    })
  });

  $scope.play = function(track, idx){
    $scope.audioPlayer = true;
    $scope.feed = track;
    $scope.state.selected = ($scope.state.selected != idx ? idx : undefined);
    if($scope.state.selected !== idx){
      $scope.audioPlayer = false;
    };
  };  

  $scope.removeArticle = function(article, index) {
    var articleId = article.key;
    var myplaylistRef = ref.child('myplaylist').child(userId).child(articleId);
    var savedRef = ref.child('saved').child(userId).child(article.rid);
    myplaylistRef.set(null); 
    savedRef.set(null);
  };

  $ionicModal.fromTemplateUrl('templates/feed-player.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openPlayerLg = function(feed){
    $scope.isPlaying = true;
    $scope.modal.show(feed);
  };

  $scope.stopPlayback = function() {
    $scope.audioPlayer = false;
    $scope.state = { selected: undefined};    
    MediaManager.stop();
  };

  $scope.pausePlay = function() {
    $scope.isPlaying = !$scope.isPlaying;
    MediaManager.pause();
  };

  $scope.resumePlay = function(feed) {
    $scope.isPlaying = !$scope.isPlaying;
    $scope.feed = feed;
    $scope.togglePlayback = $scope.togglePlayback;
  }

  // stop any track before leaving current view
  $scope.$on('$ionicView.beforeLeave', function() {
    MediaManager.stop();
  });

  $scope.closePlayerModal = function() {
    $scope.modal.hide();
    $scope.audioPlayer = false;
    $scope.state = { selected: undefined};
    MediaManager.stop();
  };

  $scope.closePlayer = function() {
    $scope.audioPlayer = false;
    $scope.state = { selected: undefined};
  }; 

  initialize();  
});