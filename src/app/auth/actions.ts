"use server";

import { createClient } from "@/lib/supabase/supabaseServerClient";

import { redirect } from "next/navigation";

export async function loginAction(previousState: unknown, formData: FormData) {
  const credentials = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  if (credentials.email === "") {
    return { error: "Email required!" };
  }

  if (credentials.password === "") {
    return { error: "Password required!" };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(credentials);

  if (error) {
    return { error: error.message };
  } else {
    const {
      data: {
        user_id,
        role: { role_name },
      },
    } = await supabase.from("user_role").select(`*,role(role_name)`).single();

    return { data: { role_name, user_id } };
  }
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/auth");
}
