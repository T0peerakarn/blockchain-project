"use server";

import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/supabaseServerClient";

export const GET = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.from("appointments").select(`
    *,
    patient_info ( first_name, last_name )
  `);

  if (error) {
    return NextResponse.json(error);
  }

  return NextResponse.json({ appointments: data });
};

export const POST = async () => {};
