if (!window.supabase || typeof window.supabase.createClient !== "function") {
  throw new Error("⚠ Supabase SDK is not loaded!");
}

// INITING SUPABASE CLIENT
var SUPABASE_URL = "https://xagmnwzigesgrlmgjosj.supabase.co";
var SUPABASE_KEY = "sb_publishable_XhFin34VLWcsVJeEjiYdcg_ZRToQFQP";
var supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY)

// EXPORTING SUPABASE CLIENT
app.constant("supabaseClient", supabaseClient);
