angular.module('odi.controllers')
.controller('PlaylistsCtrl', function($scope, Articles, $ionicModal, $stateParams, $rootScope, MediaManager, Auth, $firebaseArray, FURL, $firebaseObject, $interval, $timeout) {

  var initialize = function() {
    $scope.addLike = true;
    $scope.audioPlayer = false;
    $scope.playing = false; 
    $scope.state = { selected: undefined};
    $scope.addState = { selected: undefined};  
    $scope.modalOpen = false;
  }; 

  var userId;
  $scope.auth = Auth;
  $scope.auth.$onAuth(function(authData) {
    // console.clear();
    if(authData != null){
      $scope.userId = authData.uid;
    };
    return getPlaylist($scope.userId);
  }) 

  if ($stateParams.category != '' || $stateParams.category == undefined) {
    $scope.categoryFilter = $stateParams.category;
  } else {
    $scope.categoryFilter = '';
  }

  $scope.articles = Articles.all();  

  var ref = new Firebase(FURL);

  var getPlaylist = function(user_id) {
    if (user_id != undefined){
      var savedObj = $firebaseObject(ref.child('saved'));
      savedObj.$loaded().then(function(){
        var savedKeysArr = Object.keys(savedObj[user_id]);
        $scope.articles = $scope.articles.filter(function(ob){
          var id = ob["$id"];
          return(savedKeysArr.indexOf(id)===-1);
        });
      })
    } else {
      $scope.articles = Articles.all();
    }
  }

  $scope.playTrack = function(track, idx){
    $scope.audioPlayer = true;
    $scope.feed = track;
    $scope.state.selected = ($scope.state.selected != idx ? idx : undefined);
    if($scope.state.selected !== idx){
      return $scope.audioPlayer = false;
    };
  };

  $scope.addTrack= function(article, idx, user) {  
    $scope.audioPlayer = false;
    $scope.feed = {};
    var userId = user.uid;
    var articleId = article.$id;
    Articles.addPlaylist(article, userId);
    var playlistRef = ref.child('saved').child(userId).child(articleId);
    playlistRef.set(true);
    return getPlaylist(userId);
  }

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
    MediaManager.stop();
    $scope.feed = {};
    getPlaylist();
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