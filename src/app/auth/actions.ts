"use server"

import {createClient} from "@/lib/supabase/supabaseServerClient";
import {redirect} from "next/navigation";

export async function loginAction(previousState: unknown, formData: FormData) {

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string
    }

    if (data.email === "") {
        return {error: "Email required!"}
    }

    if (data.password === "") {
        return {error: "Password required!"}
    }

    const supabase = await createClient();
    const {error} = await supabase.auth.signInWithPassword(data)

    if (error) {
        return {error: error.message}
    } else {
        redirect('/patient/landing')
    }

}
