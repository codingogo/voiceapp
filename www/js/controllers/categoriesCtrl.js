AppCtrl
.controller('CategoriesCtrl', function($scope) {

  $scope.setActive=function(category){
    $scope.activeCategory = category;
  };

  $scope.categories = [
    {
      id: 0, title: 'travel', imageUrl:"http://media3.s-nbcnews.com/j/MSNBC/Components/Photo/_new/110421-nat-forest2-hmed.grid-10x2.jpg"
    },{
      id: 1, title: 'health', imageUrl:"https://authoritynutrition.com/wp-content/uploads/2014/09/avocado-sliced-in-half.jpg"
    },{
      id: 2, title: 'music', imageUrl:"http://i0.wp.com/www.themusiczoo.com/blog/wp-content/uploads/2015/03/carousel-image1.jpg?resize=500%2C250"
    },{
      id: 3, title: 'sports', imageUrl:"https://s-media-cache-ak0.pinimg.com/originals/21/99/fb/2199fbc6b13e7ed41d1e804217b79718.jpg"
    },{
      id: 4, title: 'space', imageUrl:"http://cache1.asset-cache.net/xd/503936820.jpg?v=1&c=IWSAsset&k=2&d=DF8D445051B40C749E1C9693F348F87C4E7679DD01108BC6D7AA5656A2D92D71B74067DC4F41F14B"
    }
  ];
})

.directive('backImg', function(){
    return function(scope, element, attrs){
        var url = attrs.backImg;
        var content = element.find('a');
        content.css({
            'background-image': 'url(' + url +')',
            'background-size' : 'cover',
            'background-position' : 'center',
            'background-repeat' : 'none'
        });
    };
});