AppService
.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    var ref = new Firebase("https://odi.firebaseio.com");
    return $firebaseAuth(ref);
  }
])

