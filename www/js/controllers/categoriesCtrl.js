AppCtrl
.controller('CategoriesCtrl', function($scope) {
	$scope.setActive=function(category){
    console.log(category);
    $scope.activeCategory = category;
  };

  $scope.categories = [
    {
      id: 0, title: 'travel', imageUrl:"http://media3.s-nbcnews.com/j/MSNBC/Components/Photo/_new/110421-nat-forest2-hmed.grid-10x2.jpg"
    },{
      id: 1, title: 'health', imageUrl:"https://pixabay.com/static/uploads/photo/2015/03/26/10/05/avocado-690898_960_720.jpg"
    },{
      id: 2, title: 'music', imageUrl:"http://i0.wp.com/www.themusiczoo.com/blog/wp-content/uploads/2015/03/carousel-image1.jpg?resize=500%2C250"
    },{
      id: 3, title: 'sports', imageUrl:"https://s-media-cache-ak0.pinimg.com/originals/21/99/fb/2199fbc6b13e7ed41d1e804217b79718.jpg"
    },{
      id: 4, title: 'space', imageUrl:"https://pixabay.com/static/uploads/photo/2015/10/12/14/59/milky-way-984050_960_720.jpg"
    }
  ]
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