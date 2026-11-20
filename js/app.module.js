var app = angular.module('app', []);

const PROJECT__URL = "https://mvprobpxnhpavmrbyxvp.supabase.co"
const SUPABASE__KEY = "sb_publishable_4uR-WfFQNipXrk_OvjQJkA_yzMhsKIq"

const supabaseClient = window.supabase.createClient(PROJECT__URL, SUPABASE__KEY);

app.constant('supabaseClient', supabaseClient);

//^ CONNECT SUPABASE
console.log("Supabase Client:", supabaseClient);
console.log("Supabase Connected:", !!supabaseClient.from);
