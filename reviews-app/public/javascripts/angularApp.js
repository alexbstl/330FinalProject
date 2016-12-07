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
     postPromise: ['courses', function(courses){
       return courses.getAll();
     }]
   }
})


.state('courses',{
  url: '/courses/{id}',
  templateUrl: '/courses.html',
  controller: 'CoursesCtrl',
  // resolve: {
  //   post: ['$stateParams', 'posts', function($stateParams, posts) {
  //     return posts.get($stateParams.id);
  //   }]
  // }
});

$urlRouterProvider.otherwise('home');
}]);

//COURSES FACTORY
app.factory('courses', ['$http',
function($http){

  var crs = {courses: []}

  //Create a New Course
  crs.create = function(course) {
    return $http.post('/courses', course).success(function(data){
      crs.courses.push(data);
    });
  };

  //Get All Courses
  crs.getAll = function() {
    return $http.get('/courses').success(function(data){
      angular.copy(data, crs.courses);
    });
  };

  //Get An Individual Course By ID
   crs.get = function(id) {
	 return $http.get('/courses/' + id).then(function(res){
		return res.data;
	 });
   };

  return crs;

}
])

// app.factory('posts',['$http',
//     function($http){
//
// 	  var o = { posts: []}
//
// 	  //Create
// 	  o.create = function(post) {
// 		return $http.post('/posts', post).success(function(data){
// 			o.posts.push(data);
// 		});
// 	  };
//
// 	  //Upvote
// 	  o.upvote = function(post) {
// 	  return $http.put('/posts/' + post._id + '/upvote')
// 		.success(function(data){
// 		  post.upvotes += 1;
// 		});
// 	  };
//
// 	  //Downvote
// 	  o.downvote = function(post){
// 		return $http.put('/posts/' + post._id + '/downvote')
// 		.success(function(data){
// 		  post.upvotes -= 1;
// 		});
// 	  }
//
// 	  //Get an Individual Post By ID
//       o.get = function(id) {
// 		return $http.get('/posts/' + id).then(function(res){
// 			return res.data;
// 		});
// 	  };
//
// 	  //Add a Comment
// 	  o.addComment = function(id, comment) {
// 		return $http.post('/posts/' + id + '/comments', comment);
// 	  };
//
// 	  //Load All Posts in Database
//       o.getAll = function() {
//         return $http.get('/posts').success(function(data){
//           angular.copy(data, o.posts);
//         });
//       };
//
//       return o;
//
// }]);

/*
app.controller('MainCtrl', [
'$scope',
'posts',
function($scope,posts){

$scope.posts = posts.posts;

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
*/

app.controller('MainCtrl', [
  '$scope',
  'courses',
  function($scope,courses){

    $scope.courses = courses.courses;

    //Add A New Course
    $scope.addCourse = function(){

      //Check to See All Required Fields Are Populated
      if(!$scope.course_name || $scope.course_name === '') { return; }
      if(!$scope.depart || $scope.depart === '') { return; }
      if(!$scope.course_code || $scope.course_code === '') { return; }
      if(!$scope.prof || $scope.prof === '') { return; }

      //If There Is No Link to Image, Populate With Default
      if($scope.img_link === ''){
        $scope.img_link = "http://www.senseitout.com/wp-content/uploads/2016/01/3q.jpg";
      }

      //Log Input
      console.log("It Worked");
      console.log($scope.course_name);
      console.log($scope.depart);
      console.log($scope.course_code);
      console.log($scope.prof);
      console.log($scope.img_link);

      //Create the New Course
      courses.create({

		name: $scope.course_name,
		code: $scope.course_code,
		dept: $scope.depart,
		prof: $scope.prof,
		img_link : $scope.img_link

      });

      //Clear Fields
      $scope.course_name = "";
      $scope.depart = "";
      $scope.course_code = "";
      $scope.prof = "";

    }
  }
]);


app.controller('CoursesCtrl', [
  '$scope',
  'courses',
  'post',
  function($scope,posts,post){

    $scope.post = post;

    //Add Comment
    $scope.addComment = function() {
      if($scope.body ===''){return; }


      posts.addComment(post._id, {
        body: $scope.body,
        author: 'user',
      }).success(function(comment) {
        $scope.post.comments.push(comment);
      });


      $scope.body='';
    };

  }
]);
