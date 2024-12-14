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

  const { data, error } = await supabase
    .from("cases")
    .select(
      `
    *,
    patient_info ( first_name, last_name )
  `
    )
    .eq("status", "ACTIVE")
    .eq("doctor_id", id);

  if (error) {
    return NextResponse.json(error);
  }

  return NextResponse.json({ cases: data });
};
