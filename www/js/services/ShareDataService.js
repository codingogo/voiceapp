AppService
  .service('ShareData', function($window){
    var KEY = 'App.SelectedValue';
    var addData = function(newObj){
      var mydata = $window.sessionStorage.getItem(KEY);
      if (mydata){
        mydata = JSON.parse(mydata);
      } else {
        mydata = [];
      }
      mydata.push(newObj);
      $window.sessionStorage.setItem(KEY, JSON.stringify(mydata));
    };

    var getData = function(){
      var mydata = $window.sessionStorage.getItem(KEY);
      if (mydata){
        mydata = JSON.parse(mydata);
      }
      return mydata || [];
    };

    return {
      addData: addData,
      getData: getData
    };
    $scope.dataToShare = [];
    $scope.shareMyData = function(filterLocation, filterCategory){
     
      if($scope.selectedDropdownItem !== null){
        $scope.dataToShare = [];
        $scope.dataToShare.push(filterLocation, $scope.selectedDropdownItem);        
      } else {
        $scope.dataToShare.push(filterLocation);
        $scope.dataToShare.push(categoryInput);
      }
      ShareData.addData($scope.dataToShare);
    }    

  });