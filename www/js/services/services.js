var AppService = angular.module('odi.services', [])
.factory('Articles', function($firebaseObject, $firebaseArray) {

  var ref = new Firebase('https://odi.firebaseio.com');
  var myplaylistRef = ref.child("myplaylist");
  var articles = $firebaseArray(ref.child('feeds').orderByChild('timestamp'));
  var myplaylist = $firebaseArray(myplaylistRef.child('userId'));

    return {
      all: function() {
        return articles;
      },
      remove: function(article) {
        articles.splice(articles.indexOf(article), 1);
      },
      get: function(articleId) {
        for (var i = 0; i < articles.length; i++){
          if(articles[i].id === parseInt(articleId)) {
            return articles[i];
          }
        }
        return null;
      },
      addPlaylist: function(article, userId){
        var playlist = {
          id: article.$id,
          rid: article.$id,
          author: article.author,
          category: article.category,
          description: article.description,
          image: article.image,
          narrator: article.narrator,
          source: article.source,
          timestamp: article.timestamp,
          title: article.title,
          url: article.url
        };
        return myplaylistRef.child(userId).push(playlist);
      }
    };
});

