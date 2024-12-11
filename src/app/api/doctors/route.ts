import { NextResponse } from "next/server";

import supabase from "@/lib/supabase/supabaseClient";

export const GET = async () => {
  const { data, error } = await supabase.from("doctor_info").select("*");

  if (error) {
    return NextResponse.json(error);
  }

  return NextResponse.json(data);
};
