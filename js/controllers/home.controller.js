app.controller('HomeController',
  ['$scope', 'supabaseClient', 'SupabaseService',
    function ($scope, supabaseClient, SupabaseService) {
      $scope.session = null;

      // INIT
      $scope.init = function () {
        console.log("HomeController initialized");
        console.log({ supabaseClient })
      }

      // CHECK CONNECTION
      $scope.checkConnection = async function () {
        try {
          var session = await SupabaseService.getSession();
          $scope.$applyAsync(() => {
            $scope.session = session;
          });
          console.log("Supabase Connected!");
          console.log("Session:", session);
        } catch (error) {
          console.log("SUPABSE ERROR =>", error)
        }
      }

      $scope.init();
      $scope.checkConnection();
    }])