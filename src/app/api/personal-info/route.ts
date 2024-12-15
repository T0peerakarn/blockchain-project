"use server";

import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/supabaseServerClient";

export const GET = async () => {
  const supabase = await createClient();

  const {
    data: {
      user: { id },
    },
  } = await supabase.auth.getUser();

  const {
    data: {
      role: { role_name },
    },
  } = await supabase.from("user_role").select("role ( role_name )").single();

  const { data } = await supabase
    .from(`${role_name}_info`)
    .select("*")
    .eq("id", id)
    .single();

  return NextResponse.json({ user: data });
};
