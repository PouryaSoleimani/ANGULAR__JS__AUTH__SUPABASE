app.factory('SupabaseService', function () {
  return {
    client: supabaseClient,
    getSession: async function () {
      var result = await supabaseClient.auth.getSession();
      if (result.error) {
        throw result.error;
      }
      return result.data.session;
    }
  }
});