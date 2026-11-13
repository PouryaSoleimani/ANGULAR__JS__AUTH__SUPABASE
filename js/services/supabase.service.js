app.factory('SupabaseService', function () {
  return {
    client: supabase,
    getSession: async function () {
      var result = await supabase.auth.getSession();
      if (result.error) {
        throw result.error;
      }
      return result.data.session;
    }
  }
});