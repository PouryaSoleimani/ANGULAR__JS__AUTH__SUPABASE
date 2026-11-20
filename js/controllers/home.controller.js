app.controller("HomeController", [
  "$scope",
  "$location",
  "$timeout",
  "$document",
  function ($scope, $location, $timeout, $document) {
    $scope.vm = {
      waiting: false,
      username: "",
      users: [],
    };

    $scope.init = function () {
      $scope.vm.waiting = true;
      $scope.getUsers();
    };

    $scope.getUsers = async function () {
      const { data, error } = await supabaseClient.from("users").select("*");

      if (error) {
        console.error("Error:", error);
        return;
      }

      $scope.$applyAsync(function () {
        $scope.vm.users = data;
        $scope.vm.waiting = false;
      });

      $timeout(() => {
        console.log("TIMEOUT");
      }, 1000);
    };

    $scope.insertUser = async function () {
      try {
        const { data, error } = await supabaseClient
          .from("users")
          .insert([
            {
              full_name: $scope.vm.username,
              email: $scope.vm.username.slice(0, 6) + "@gmail.com",
              age: Number(Math.random() * 100).toFixed(0),
              isAccepted: false,
            },
          ])
          .select();

        if (error) {
          console.error("Error:", error);
          return;
        }

        console.log("Inserted user:", data);

        $scope.$applyAsync(function () {
          $scope.vm.username = "";
        });

        await $scope.getUsers();
      } catch (error) {
        console.error("Unexpected error:", error);
      } finally {
        $scope.$applyAsync(function () {
          $scope.vm.waiting = false;
        });
      }
    };

    $scope.acceptUser = async function (ID) {
      console.log("ID ", ID);
    };

    $scope.init();
  },
]);
