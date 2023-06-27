
require('dotenv').config()
const {createClient}=require('@supabase/supabase-js');
const supabaseUrl=process.env.supabase_url;
const supabaseKey=process.env.supabase_key;

const supabase=createClient(supabaseUrl, supabaseKey);

module.exports=supabase