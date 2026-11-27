(function () {
  "use strict";

  //^ CREATING SERVICE
  angular.module("app").service("SupabaseService", [
    "supabaseClient", // Injecting supabaseClient
    function (supabaseClient) {
      this.getUsers = async function () {
        const { data, error } = await supabaseClient
          .from("users")
          .select("*")
          .order("id", { ascending: true });

        if (error) {
          throw error;
        }

        return data;
      };

      this.insertUser = async function (username) {
        const { data, error } = await supabaseClient
          .from("users")
          .insert([
            {
              full_name: username,
              email: username.slice(0, 6) + "@gmail.com",
              age: Number((Math.random() * 100).toFixed(0)),
              isAccepted: false,
            },
          ])
          .select();

        if (error) {
          throw error;
        }

        return data;
      };

      this.updateUserStatus = async function (id, isAccepted) {
        const { data, error } = await supabaseClient
          .from("users")
          .update({ isAccepted: isAccepted })
          .eq("id", id)
          .select();

        if (error) {
          throw error;
        }

        return data;
      };

      this.deleteUser = async function (id) {
        const { data, error } = await supabaseClient
          .from("users")
          .delete()
          .eq("id", id)
          .select();

        if (error) {
          throw error;
        }

        return data;
      };
    },
  ]);
})();
