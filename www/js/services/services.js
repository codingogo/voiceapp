angular.module('odi.services', [])
.factory('Articles', function($firebaseObject) {

  var articles = [{
    id: 0,
    title: "Groupon reports better-than-expected revenue, still not profitable",
    description: "Deal site Groupon saw its shares rising today in after-hours trading, following a better-than-expected second quarter earnings report. Analysts expected the Chicago-based company to report negative earnings per share of $0.02 on revenue on a non-GAAP basis, and $713.8 million in revenue, according to Estimize data. But Groupon beat Wall Street revenue expectations with second",
    image: "http://cdn.wallpaper.com/main/casa-mathilde-2.jpg",
    media: "",
    source: "Forbes"
  },{
    id: 1,
    title: "Security experts have cloned all seven TSA master keys",
    description: "Key escrow — the process of keeping a set of keys for yourself “just in case” — has always been the U.S. government’s modus operandi when it comes to security. From the disastrous Clipper chip to today, the government has always wanted a back door into encryption and security. That plan backfired for the TSA. The TSA, as you’ll remember, offers a set of",
    image: "http://cdn.wallpaper.com/main/00_vessels_0.jpg",
    media: "",
    source: "Tech Insider"
  }, {
    id: 2,
    title: "Will Facebook be your next call center operator?",
    description: "How would you describe Facebook? Historically, it’s been the social hub of billions of users looking to stay connected with friends and family. Yet in recent years, it’s become more difficult to describe Facebook in a few words — it’s a place for businesses to share info with consumers, advertisers to market to target audiences, media to deliver news and a place to",
    image: "http://i0.wp.com/www.therefinedgeek.com.au/wp-content/uploads/2014/11/Glonets-M-Satellite.jpg",
    media: "",
    source: "News.com"
  }, {
    id: 3,
    title: "Xiaomi’s first laptop is a Macbook Air rival that’s as cheap as $540",
    description: "Chinese smartphone and smart device maker Xiaomi just announced its first laptop — and boy does it look familiar to products belonging to a company that begins with the letter ‘A’.",
    image: "http://markjohnson.com/blog/wp-content/uploads/2012/05/SUP-434_MarkAJohnson-500x288.jpg",
    media: "",
    source: "Magic Seaweed"
  }, {
    id: 4,
    title: "Facebook crushes Q2 earnings, hits 1.71B users and record share price",
    description: "Coming off an all-time high stock price of $123.34, Facebook in Q2 2016 smashed earnings again. The social network continued steady growth just slightly slower at 3.63% compared to last quarter’s 3.77%, adding 60 million monthly users this quarter to reach 1.71 billion. It scored $6.44 billion in revenue and $0.97 EPS, blowing past estimates of $6.02 billion and $0.82 EPS",
    image: "http://www.magic4walls.com/wp-content/uploads/2013/11/night-winter-sky-stars-river-ice-the-horizon-the-lights-man.-mood-Tilt-Shift-Tilt-Shift-background-pictures-wallpaper-wallpapers.jpg",
    media: "",
    source: "CNET"
  }];

  return {
    all: function() {
      return articles;
    },
    remove: function(article) {
      articles.splice(articles.indexOf(article), 1);
    },
    get: function(articleId) {
      console.log(articles.length)
      for (var i = 0; i < articles.length; i++){
        if(articles[i].id === parseInt(articleId)) {
          return articles[i];
        }
      }
      return null;
    }
  };
});
