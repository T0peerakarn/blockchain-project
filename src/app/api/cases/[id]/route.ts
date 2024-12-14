"use server";

import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/supabaseServerClient";

export const GET = async (
  _req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("cases")
    .select(
      `
      *,
      patient_info ( first_name, last_name )
    `
    )
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json(error);
  }

  return NextResponse.json({ cases: data });
};
