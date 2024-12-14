"use server";

import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/supabaseServerClient";

export const GET = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.from("appointments").select(`
    *,
    patient_info ( first_name, last_name ),
    medical_records ( detail ),
    cases ( title )
  `);

  if (error) {
    return NextResponse.json(error);
  }

  return NextResponse.json({ appointments: data });
};
