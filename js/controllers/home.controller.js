app.controller("HomeController", [
  "$scope",
  "$location",
  "$timeout",
  "$document",
  function ($scope, $location, $timeout, $document) {
    $scope.vm = {
      waiting: true,
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
      $scope.vm.waiting = true;
      try {
        const { data, error } = await supabaseClient.from("users").update({ isAccepted: true }).eq("id", ID).select();
        console.log("updated user => ", data);
        $timeout(() => {
          $scope.getUsers();
          $scope.vm.waiting = false;
        }, 500);
      } catch (error) {
        console.error("Error:", error);
        return;
      }
    };

    $scope.denyUser = async function (ID) {
      console.log("ID ", ID);
      try {
        $scope.vm.waiting = true;
        const { data } = await supabaseClient.from("users").update({ isAccepted: false }).eq("id", ID).select();
        console.log("updated user => ", data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        $scope.getUsers();
        $timeout(() => {
          $scope.vm.waiting = false;
        }, 500);
      }
    };

    $scope.init();
  },
]);
