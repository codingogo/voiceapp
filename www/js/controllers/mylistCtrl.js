angular.module('odi.controllers')
.controller('MylistCtrl', function($scope, Articles, $ionicModal, $stateParams, $rootScope, MediaManager, Auth, FURL, $firebaseObject, $interval, $timeout) {

  var initialize = function() {
    $scope.audioPlayer = false;
    $scope.playing = false; 
    $scope.state = { selected: undefined};
    $scope.addState = { selected: undefined};  
    $scope.modalOpen = false;
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
      return $scope.audioPlayer = false;
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

  var runDynamicTrack;
  $scope.pausePlay = function(feed) {
    $scope.track = {};
    if($scope.isPlaying){
      MediaManager.pause();
      $scope.isPlaying = false;
    } else {
      var dynamicTrack = $rootScope.currentMediaTrack;
      dynamicTrack.play();
      var duration = dynamicTrack.getDuration();
      runDynamicTrack = $interval(function() {
        dynamicTrack.getCurrentPosition(
          function (position) {
            if (position > -1) {
              $scope.dynamicTrack.progress = position;
              $rootScope.$broadcast('ionic-audio:trackChange', $scope.dynamicTrack);
            }
          },
          function (e) {
            console.log("Error getting pos=" + e);
          }
        );
      }, 1000);  

      $timeout(function() {
        $scope.dynamicTrack.duration = duration;
      }, 300);

      $scope.dynamicTrack = dynamicTrack;
      $scope.isPlaying = true;
    }
  };

  // stop any track before leaving current view
  $scope.$on('$ionicView.beforeLeave', function() {
    MediaManager.stop();
  });

  $scope.closePlayerModal = function() {
    MediaManager.stop();
    $scope.modal.hide();
    $scope.audioPlayer = false;
    $scope.feed = {};
    $scope.dynamicTrack = null;
    $scope.isPlaying = false;
    $scope.$on('$destroy', function(){$interval.cancel(runDynamicTrack);});
  };

  $scope.closePlayer = function() {
    $scope.audioPlayer = false;
    $scope.state = { selected: undefined};
  }; 

  initialize();  
});