"use server";

import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/supabaseServerClient";

export const GET = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("validations")
    .select(`*,doctor_info(first_name, last_name)`);

  if (error) {
    return NextResponse.json(error);
  }

  return NextResponse.json({
    validations: data,
  });
};

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const supabase = await createClient();
  const { error } = await supabase.from("validations").insert(body);

  if (error) {
    return NextResponse.json(error);
  }

  return NextResponse.json({ message: "ok" });
};
