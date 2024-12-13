"use server";

import { createClient } from "@/lib/supabase/supabaseServerClient";

export const submitAppointment = async (
  previousState: unknown,
  formData: FormData
) => {
  if (formData.get("patient_id") === "") {
    return { error: "Please select patient to make an appointment" };
  }

  if (formData.get("detail") === "") {
    return { error: "Please fill the purpose of visit" };
  }

  if (formData.get("start") === "") {
    return { error: "Please select the start datetime" };
  }

  if (formData.get("end") === "") {
    return { error: "Please select the end datetime" };
  }

  if (
    new Date(formData.get("start") as string).getTime() >
    new Date(formData.get("end") as string).getTime()
  ) {
    return { error: "Start datetime should be before end datetime" };
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const payload = {
    doctor_id: user!.id,
    patient_id: formData.get("patient_id"),
    detail: formData.get("detail"),
    start_datetime: new Date(formData.get("start") as string),
    end_datetime: new Date(formData.get("end") as string),
  };

  await supabase.from("appointments").insert(payload);

  return { ok: true };
};

export const rescheduleAppointment = async (
  previousState: unknown,
  formData: FormData
) => {
  if (formData.get("start") === "") {
    return { error: "Please select the start datetime" };
  }

  if (formData.get("end") === "") {
    return { error: "Please select the end datetime" };
  }

  if (
    new Date(formData.get("start") as string).getTime() >
    new Date(formData.get("end") as string).getTime()
  ) {
    return { error: "Start datetime should be before end datetime" };
  }

  const supabase = await createClient();
  await supabase
    .from("appointments")
    .update({
      start_datetime: new Date(formData.get("start") as string),
      end_datetime: new Date(formData.get("end") as string),
    })
    .eq("id", formData.get("id"));

  return { ok: true };
};

export const submitRecord = async (
  previousState: unknown,
  formData: FormData
) => {
  if (formData.get("record") === "") {
    return { error: "Record shouldn't be empty" };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("medical_records").insert({
    doctor_id: formData.get("doctor_id"),
    patient_id: formData.get("patient_id"),
    detail: formData.get("record"),
    appointment_id: formData.get("appointment_id"),
  });

  console.log(`error: ${JSON.stringify(error)}`);

  return { ok: true };
};
