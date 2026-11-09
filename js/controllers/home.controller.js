app.controller('HomeController', ['$scope', 'supabase', function ($scope, supabase) {
  $scope.init = function () {
    console.log("HomeController initialized");
    console.log({ supabase })
  }
  $scope.init();
}])