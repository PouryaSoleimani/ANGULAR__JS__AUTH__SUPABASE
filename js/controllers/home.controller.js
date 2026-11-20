app.controller('HomeController', ['$scope', '$location', '$timeout',
  function ($scope, $location, $timeout) {
    $scope.vm = {
      waiting: false,
      username: ''
    }

    $scope.init = function () {
      $scope.getUsers();
    }

    $scope.getUsers = async function () {
      const { data, error } = await supabaseClient.from('users').select('*');

      if (error) {
        console.error('Error:', error)
        return;
      }

      console.log('users:', data)
    }

    $scope.insertUser = async function () {
      $scope.waiting = true;
      const { data, error } = await supabaseClient.from('users').insert([
        {
          full_name: $scope.vm.username,
          email: 'pourya@gmail.com',
          age: 33,
        }
      ]).select();

      if (error) {
        console.error('Error:', error)
        return;
      }
      console.log('Inserted user:', data)
      $timeout(() => {
        $scope.waiting = false;
        $scope.vm.username = '';
        console.log('timeout')
      }, 1000);
    }

    $scope.init()
  }])