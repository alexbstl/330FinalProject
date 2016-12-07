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
      resolve: {
        course: ['$stateParams', 'courses', function($stateParams, courses) {
          return courses.get($stateParams.id);
        }]
      }
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
      console.log("you're in here");
      return $http.get('/courses/' + id).then(function(res){
        console.log(res);
        return res.data;
      });
    };

    //Add a Review to a Course
    crs.addReview = function(id, review) {
      return $http.post('/courses/' + id + '/reviews', review);
    };


    return crs;

  }
])

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
      if(!$scope.img_link){
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
        img_link : $scope.img_link,
        overall_score : 0,
        diff_score : 0,
        teach_score : 0

      });

      //Clear Fields
      $scope.course_name = "";
      $scope.depart = "";
      $scope.course_code = "";
      $scope.prof = "";
      $scope.img_link = "";

    }
  }
]);

app.controller('CoursesCtrl', [
  '$scope',
  'courses',
  'course',
  function($scope,courses,course){

    $scope.course = course;
    $scope.values=[1,2,3,4,5];
    $scope.overall_score=5;
    $scope.diff_score=5;
    $scope.teach_score=5;


    //Add Review
    $scope.addReview = function() {
      if($scope.body ===''){return; }

      console.log("You're In");
      courses.addReview(course._id, {

        body: $scope.body,
        overall_score : $scope.overall_score,
        diff_score : $scope.diff_score,
        teach_score : $scope.teach_score


      }).success(function(review) {
        console.log(review);
        $scope.course.reviews.push(review);
      });

      $scope.body='';
    };


  }
]);
