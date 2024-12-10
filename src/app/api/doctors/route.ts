import { NextResponse } from "next/server";

import supabase from "@/lib/supabase/supabaseClient";

export const GET = async () => {
  const { data, error } = await supabase.from("Doctor Information").select("*");
  console.log(data, error);

  return NextResponse.json(data);
};
