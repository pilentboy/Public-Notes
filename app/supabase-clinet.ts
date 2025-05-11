import { createClient } from "@supabase/supabase-js";

const URL = "https://knfrepuopwryrpbxfgxa.supabase.co";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtuZnJlcHVvcHdyeXJwYnhmZ3hhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4MzA5ODQsImV4cCI6MjA2MjQwNjk4NH0.KYumy3vL5zLD13UzOLx1zp99cHbGgfKYM___I3ID5FU";

export const supabase = createClient(URL, API_KEY);
