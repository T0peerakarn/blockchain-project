"use server";

import { createClient } from "@/lib/supabase/supabaseServerClient";

export const createCase = async (
  previousState: unknown,
  formData: FormData
) => {
  if (formData.get("patient_id") === "") {
    return { error: "Please select patient to create a case" };
  }

  if (formData.get("title") === "") {
    return { error: "Title should not be empty" };
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from("cases").insert({
    doctor_id: user!.id,
    patient_id: formData.get("patient_id"),
    title: formData.get("title"),
  });

  console.log(error);

  return { ok: true };
};

export const transferCase = async (
  previousState: unknown,
  formData: FormData
) => {
  if (formData.get("doctor_id") === "") {
    return { error: "Please select doctor to transfer" };
  }

  console.log(formData.get("doctor_id"), formData.get("case_id"));

  const supabase = await createClient();
  const { error } = await supabase
    .from("cases")
    .update({
      doctor_id: formData.get("doctor_id"),
    })
    .eq("id", formData.get("case_id"));

  if (error) {
    console.error(error);
  }

  return { ok: true };
};
