"use server";

import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/supabaseServerClient";

export const GET = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.from("patient_info").select("*");

  if (error) {
    return NextResponse.json(error);
  }

  return NextResponse.json({ patients: data });
};
