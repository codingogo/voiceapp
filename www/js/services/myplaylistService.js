AppService
.factory("Myplaylist" ,function($firebaseArray, $firebaseObject) {
    var ref = new Firebase('https://odi.firebaseio.com');
    var savedArticles = $firebaseArray(ref.child('saved'));

    return {
    	all: function() {
      	return savedArticles;
    	}, 
    	getSavedArticle: function(userId, articleId){
    		return $firebaseObject(ref.child('saved').child(userId).child(articleId));
    	},
    	removeTrack: function(userId, articleId){
    		return this.getSavedArticle(userId, articleId).$remove();
    	}
    }
});
