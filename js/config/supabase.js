(function () {
  "use strict";

  angular.module("app")
    .constant("SUPABASE_CONFIG", { // creating SUPABASE_CONFIG 
      url: "https://mvprobpxnhpavmrbyxvp.supabase.co",
      key: "sb_publishable_4uR-WfFQNipXrk_OvjQJkA_yzMhsKIq",
    })
    .factory("supabaseClient", [ // creating supabaseClient
      "SUPABASE_CONFIG",
      function (SUPABASE_CONFIG) {
        const client = window.supabase.createClient(
          SUPABASE_CONFIG.url,
          SUPABASE_CONFIG.key
        );

        console.log("Supabase Client:", client);
        console.log("Supabase Connected:", !!client.from);

        return client;
      },
    ]);
})();
