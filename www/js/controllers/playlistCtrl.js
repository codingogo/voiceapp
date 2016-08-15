angular.module('odi.controllers')
.controller('PlaylistsCtrl', function($scope, Articles, $ionicModal, $stateParams, $rootScope, MediaManager, Auth, $firebaseArray, FURL, $firebaseObject) {

  var initialize = function() {
    $scope.addLike = true;
    $scope.audioPlayer = false;
    $scope.playing = false; 
    $scope.state = { selected: undefined};
    $scope.addState = { selected: undefined};  
    // $scope.isLoading = false;
  }; 

  var userId;
  $scope.auth = Auth;
  $scope.auth.$onAuth(function(authData) {
    // console.clear();
    $scope.userId = authData.uid;
    return getPlaylist($scope.userId);
  }) 

  if ($stateParams.category != '' || $stateParams.category == undefined) {
    $scope.categoryFilter = $stateParams.category;
  } else {
    $scope.categoryFilter = '';
  }

  $scope.articles = Articles.all();  

  var ref = new Firebase(FURL);

  var getPlaylist = function(userId) {
    var savedObj = $firebaseObject(ref.child('saved'));
    savedObj.$loaded().then(function(){
      var savedKeysArr = Object.keys(savedObj[userId]);
      $scope.articles = $scope.articles.filter(function(ob){
        var id = ob["$id"];
        return(savedKeysArr.indexOf(id)===-1);
      });
    })
  }

  $scope.playTrack = function(track, idx){
    $scope.audioPlayer = true;
    $scope.feed = track;
    $scope.state.selected = ($scope.state.selected != idx ? idx : undefined);
    if($scope.state.selected !== idx){
      return $scope.audioPlayer = false;
    };

    // $scope.togglePlayback = !$scope.togglePlayback;
  };

  $scope.addTrack= function(article, idx, user) {  
    $scope.audioPlayer = false;
    $scope.feed = null;
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
    $scope.modal.show(feed);
  };

  // bind stop button in view
  $scope.stopPlayback = function() {
    $scope.audioPlayer = false;
    $scope.state = { selected: undefined};    
    MediaManager.stop();
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
  }  

  initialize();
});