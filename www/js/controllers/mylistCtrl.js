angular.module('odi.controllers')
.controller('MylistCtrl', function($scope, Articles, $ionicModal, $stateParams, $rootScope, MediaManager, Auth, Myplaylist, FURL, $firebaseObject) {
  var initialize = function() {
    $scope.audioPlayer = false;
    $scope.playing = false; 
    $scope.state = { selected: undefined};
    $scope.addState = { selected: undefined};  
    var userId;
  }; 

  var ref = new Firebase(FURL);

  Auth.$onAuth(function(authData) {
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
        $scope.articles = playlist;
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
    var myplaylistRef = ref.child('myplaylist').child(userId).child(articleId);
    var myplaylistKey = myplaylistRef.key();
    var savedRef = ref.child('saved').child(userId).child(article.id);
    var savedKey = savedRef.key();   
    savedRef.on('value', function(snapshot){
      if(snapshot.val() != null){
        setTimeout(function(){
          savedRef.set(null, function(err){
            if(err){
              console.log('delete err', err);
            }
          });
        }, 300);
        setTimeout(function() {
          myplaylistRef.set(null);
        }, 300);
      }
    });
//     console.log('userId', userId);
//     console.log('articleId', articleId);
//     console.log('article.id', article.id);
//     console.log('savedKey', savedKey);
//     console.log('myplaylistKey', myplaylistKey);
// console.log('article', article);

    // var updatePlaylist = {};
    // updatePlaylist['saved/'+ userId+'/'+savedKey]=null;
    // updatePlaylist['myplaylist/'+userId+'/'+myplaylistKey]=null;
    // console.log('updatePlaylist', updatePlaylist);
  };

  $scope.openPlayerLg = function(feed){
    return $scope.modal.show(feed);
  };  

  // bind stop button in view
  $scope.stopPlayback = function() {
    $scope.audioPlayer = false;
    $scope.state = { selected: undefined};    
    return MediaManager.stop();
  };

  // stop any track before leaving current view
  $scope.$on('$ionicView.beforeLeave', function() {
    return MediaManager.stop();
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