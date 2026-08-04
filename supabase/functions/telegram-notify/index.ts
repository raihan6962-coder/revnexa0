import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.58.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { full_name, email, app_name, message, channel, country } = await req.json();

    if (!full_name || !email) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

    if (supabaseUrl && supabaseServiceKey) {
      const supabase = createClient(supabaseUrl, supabaseServiceKey);

      const { data: settings } = await supabase
        .from("site_settings")
        .select("key, value")
        .in("key", ["telegram_bot_token", "telegram_chat_id"]);

      const settingsMap: Record<string, string> = {};
      for (const row of settings || []) {
        settingsMap[row.key] = row.value;
      }

      const botToken = settingsMap["telegram_bot_token"];
      const chatId = settingsMap["telegram_chat_id"];

      if (botToken && chatId) {
        const text = [
          "🔔 New Revnexa Inquiry",
          "",
          `👤 Name: ${full_name}`,
          `📧 Email: ${email}`,
          app_name ? `📱 App: ${app_name}` : "",
          `💬 Channel: ${channel || "email"}`,
          country ? `🌍 Country: ${country}` : "",
          "",
          `💬 Message: ${message || ""}`,
        ].filter(Boolean).join("\n");

        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text,
          }),
        });
      }
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
