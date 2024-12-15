"use server";

import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/supabaseServerClient";

export const GET = async (
  _req: NextRequest,
  { params }: { params: { caseId: string } }
) => {
  const { caseId } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("medical_records")
    .select(
      `
    *,
    doctor_info ( first_name, last_name )
  `
    )
    .eq("case_id", caseId);

  if (error) {
    return NextResponse.json(error);
  }

  return NextResponse.json({
    records: data,
  });
};
