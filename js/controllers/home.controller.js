(function () {
  "use strict";

  angular.module("app").controller("HomeController", [
    "$scope",
    "$timeout",
    "SupabaseService", // Dependency Injection
    function ($scope, $timeout, SupabaseService) {
      $scope.vm = {
        waiting: true,
        username: "",
        users: [],
      };

      let toastTimer = null;

      $scope.init = function () {
        $scope.vm.waiting = true;
        $scope.getUsers();
      };

      $scope.toastHandler = function (text, border) {
        const toast = document.querySelector(".toast");
        if (!toast) return;

        if (toastTimer) {
          $timeout.cancel(toastTimer);
        }

        toast.textContent = text;
        toast.classList.remove(
          "border-emerald-500",
          "border-zinc-500",
          "border-rose-500",
          "outside"
        );
        toast.classList.add(`border-${border}-500`);

        toastTimer = $timeout(() => {
          toast.classList.add("outside");
        }, 1000);
      };

      $scope.getUsers = async function () {
        try {
          const users = await SupabaseService.getUsers();
          $scope.$applyAsync(function () {
            $scope.vm.users = users;
          });
        } catch (error) {
          console.error("Error fetching users:", error);
        } finally {
          $scope.$applyAsync(function () {
            $scope.vm.waiting = false;
          });
        }
      };

      $scope.insertUser = async function () {
        $scope.vm.waiting = true;
        try {
          const data = await SupabaseService.insertUser($scope.vm.username);
          console.log("Inserted user:", data);

          $scope.$applyAsync(function () {
            $scope.vm.username = "";
          });
          $scope.toastHandler("USER ADDED", "emerald");
          await $scope.getUsers();
        } catch (error) {
          console.error("Error inserting user:", error);
          $scope.$applyAsync(function () {
            $scope.vm.waiting = false;
          });
        }
      };

      $scope.acceptUser = async function (id) {
        $scope.vm.waiting = true;
        try {
          const data = await SupabaseService.updateUserStatus(id, true);
          console.log("Updated user =>", data);
          $scope.toastHandler("USER ACCEPTED", "emerald");
          await $scope.getUsers();
        } catch (error) {
          console.error("Error accepting user:", error);
          $scope.$applyAsync(function () {
            $scope.vm.waiting = false;
          });
        }
      };

      $scope.denyUser = async function (id) {
        $scope.vm.waiting = true;
        try {
          const data = await SupabaseService.updateUserStatus(id, false);
          console.log("Updated user =>", data);
          $scope.toastHandler("USER DENIED", "zinc");
          await $scope.getUsers();
        } catch (error) {
          console.error("Error denying user:", error);
          $scope.$applyAsync(function () {
            $scope.vm.waiting = false;
          });
        }
      };

      $scope.deleteUser = async function (id) {
        $scope.vm.waiting = true;
        try {
          const data = await SupabaseService.deleteUser(id);
          console.log("Deleted user:", data);
          $scope.toastHandler("USER DELETED", "rose");
          await $scope.getUsers();
        } catch (error) {
          console.error("Error deleting user:", error);
          $scope.$applyAsync(function () {
            $scope.vm.waiting = false;
          });
        }
      };

      $scope.init();
    },
  ]);
})();
