"use server";

import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/supabaseServerClient";

export const GET = async () => {
  const supabase = await createClient();

  const {
    data: {
      role: { role_name },
    },
    error,
  } = await supabase.from("user_role").select("role ( role_name )").single();

  if (error) {
    return NextResponse.json(error);
  }

  const { data } = await supabase
    .from(`${role_name}_info`)
    .select("*")
    .single();

  return NextResponse.json({ user: data });
};
