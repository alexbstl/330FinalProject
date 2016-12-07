var app = angular.module('ourBlog', ['ui.router'])

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider,$urlRouterProvider){

    $stateProvider
	
	.state('home', {
	  url: '/home',
	  templateUrl: '/home.html',
	  controller: 'MainCtrl',
	  resolve: {
		postPromise: ['posts', function(posts){
		  return posts.getAll();
		}]
	  }
	})
	
	.state('posts', {
	  url: '/posts/{id}',
	  templateUrl: '/posts.html',
	  controller: 'PostsCtrl',
	  resolve: {
		post: ['$stateParams', 'posts', function($stateParams, posts) {
		  return posts.get($stateParams.id);
		}]
	  }
	});

    $urlRouterProvider.otherwise('home');
  }]);

app.factory('posts',['$http',
    function($http){

	  var o = { posts: []}
	  
	  //Create
	  o.create = function(post) {
		return $http.post('/posts', post).success(function(data){
			o.posts.push(data);
		});
	  };
      
	  //Upvote
	  o.upvote = function(post) {
	  return $http.put('/posts/' + post._id + '/upvote')
		.success(function(data){
		  post.upvotes += 1;
		});
	  };
	  
	  //Downvote
	  o.downvote = function(post){
		return $http.put('/posts/' + post._id + '/downvote')
		.success(function(data){
		  post.upvotes -= 1;
		});  
	  }
	  
	  //Get an Individual Post By ID
      o.get = function(id) {
		return $http.get('/posts/' + id).then(function(res){
			return res.data;
		});
	  };
	  
	  //Load All Posts in Database
      o.getAll = function() {
        return $http.get('/posts').success(function(data){
          angular.copy(data, o.posts);
        });
      };
	  
      return o;
	  
}]);
app.controller('MainCtrl', [
      '$scope',
      'posts',
	  'post',
      function($scope,posts,post){
        $scope.test = 'Hello world!';
        $scope.posts = posts.posts;
		$scope.post = post;
		
		
        $scope.addPost = function(){
          if(!$scope.title || $scope.title === '') { return; }
          $scope.posts.push({
            title: $scope.title,
            link: $scope.link,
            upvotes: 0,
            comments: [
              {author: 'Joe', body: 'Cool post!', upvotes: 0},
              {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
            ]
          });
          $scope.title='';
          $scope.link='';
        };
		
		
		/*
        $scope.decrementUpvotes = function(post) {
          post.upvotes -= 1;
        };
		*/
		
		//Upvote Post
		$scope.incrementUpvotes = function(post) {
		  posts.upvote(post);
		};
		
		//Downvote Post
		$scope.decrementUpvotes = function(post) {
		  posts.downvote(post);
		};
		
		//Add Post
		$scope.addPost = function(){
		  if(!$scope.title || $scope.title === '') { return; }
		  posts.create({
			title: $scope.title,
			link: $scope.link,
		  });
		  $scope.title = '';
		  $scope.link = '';
		};
				
}]);
app.controller('PostsCtrl', [
        '$scope',
        '$stateParams',
        'posts',
        function($scope, $stateParams, posts){
          $scope.post = posts.posts[$stateParams.id];
          $scope.addComment = function() {
            if($scope.body ===''){return; }
            $scope.post.comments.push({
              body: $scope.body,
              author: 'user',
              upvotes: 0
            });
            $scope.body='';
          };
}]);
