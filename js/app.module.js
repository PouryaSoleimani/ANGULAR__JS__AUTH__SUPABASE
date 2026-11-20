var app = angular.module('app', []);

const PROJECT__URL = "https://mvprobpxnhpavmrbyxvp.supabase.co"
const SUPABASE__KEY = "sb_publishable_4uR-WfFQNipXrk_OvjQJkA_yzMhsKIq"

const supabaseClient = window.supabase.createClient(PROJECT__URL, SUPABASE__KEY);

app.constant('supabaseClient', supabaseClient);

console.log("Supabase Client:", supabaseClient);
console.log("Supabase Connected:", !!supabaseClient.from);

// METHODS
async function getUsers() {
  const { data, error } = await supabaseClient.from('users').select('*');

  if (error) {
    console.error('Error:', error)
    return;
  }

  console.log('users:', data)
}

getUsers()