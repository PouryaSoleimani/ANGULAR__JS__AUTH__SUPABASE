app.controller("HomeController", ["$scope", "$timeout","supabaseClient",
  function ($scope, $timeout , $supabaseClient) {
    $scope.vm = {
      waiting: true,
      username: "",
      users: [],
    };

    $scope.init = function () {
      $scope.vm.waiting = true;
      $scope.getUsers();
    };

    $scope.toastHandler = function (text, border) {
      const toast = document.querySelector('.toast');
      const toastClasses = 'toast bg-white w-64 h-16 p-4 leading-5 text-xl rounded-lg font-semibold absolute top-6 right-4 border-4 outside'
      toast.textContent = text;
      toast.classLisName = toastClasses;
      toast.classList.add(`border-${border}-500`);
      toast.classList.remove('outside')
      $timeout(() => {
        toast.classList.add('outside')
      }, 1000)
    }

    $scope.getUsers = async function () {
      const { data, error } = await supabaseClient
        .from("users")
        .select("*")
        .order('id');

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
        $scope.toastHandler('USER ADDED', 'emerald');
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
      console.log("ACCEPT ID ", ID);
      $scope.vm.waiting = true;
      try {
        const { data, error } = await supabaseClient
          .from("users")
          .update({ isAccepted: true })
          .eq("id", ID)
          .select();

        if (error) {
          console.error("Supabase Error:", error);
          return;
        }

        console.log("updated user => ", data);
        $scope.toastHandler('USER ACCEPTED', 'emerald');
        $timeout(() => {
          $scope.getUsers();
          $scope.$applyAsync(() => {
            $scope.vm.waiting = false;
          });
        }, 500);
      } catch (error) {
        console.error("Error:", error);
        return;
      } finally {
        $scope.$applyAsync(() => {
          $scope.vm.waiting = false;
        });
      }
    };

    $scope.denyUser = async function (ID) {
      console.log("ID ", ID);
      try {
        $scope.vm.waiting = true;
        const { data } = await supabaseClient
          .from("users")
          .update({ isAccepted: false })
          .eq("id", ID)
          .select();
        console.log("updated user => ", data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        $scope.getUsers();
        $scope.toastHandler('USER DENIED', 'zinc');
        $timeout(() => {
          $scope.vm.waiting = false;
        }, 500);
      }
    };

    $scope.deleteUser = async function (ID) {
      $scope.vm.waiting = true;
      try {
        const { data, error } = await supabaseClient
          .from('users')
          .delete()
          .eq('id', ID)
          .select();

        if (error) {
          console.log('Error:', error);
        }

        console.log('Deleted user:', data);
        $scope.toastHandler('USER DELETED', 'rose');
        await $scope.getUsers();
      } catch (error) {
        console.error("Error:", error);
      } finally {
        $scope.$applyAsync(function () {
          $scope.vm.waiting = false;
        });
      }
    }



    $scope.init();
  },
]);
