"use client";

import { useActionState, useState } from "react";

import Image from "next/image";

import TextInput from "@/components/TextInput";

import { FiEye, FiEyeOff } from "react-icons/fi";
import Button from "@/components/Button";
import { loginAction } from "@/app/auth/actions";

const AuthPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [data, action, isPending] = useActionState(loginAction, undefined);

  return (
    <div className="flex flex-row h-screen">
      <div className="w-[55%] relative">
        <div className="w-full h-full bg-white opacity-80" />
        <Image
          src="/auth_background.png"
          alt="auth_background"
          layout="fill"
          objectFit="cover"
          objectPosition="left"
          className="z-[-1]"
          priority
          sizes="auto"
        />
        <div className="absolute top-[25%] left-[10%]">
          <h1 className="josefin-sans text-8xl text-[#2F5DA8]">Healthcare</h1>
          <h1 className="josefin-sans text-8xl">Management</h1>
          <h1 className="josefin-sans text-8xl">System</h1>
          <p className="josefin-sans text-xl text-[#2F5DA8] italic">
            Healthcare information and cases managed better using blockchain
          </p>
        </div>
      </div>

      <div className="w-[45%] bg-[#709FEB] flex items-center justify-center">
        <div className="w-3/4 bg-white px-8 py-16 rounded-[42px] shadow-lg flex flex-col gap-8">
          <div className="px-8 flex flex-col gap-8">
            <div>
              <h1 className="josefin-sans text-3xl">Welcome Back!</h1>
              <p className="josefin-sans text-xl font-light">
                Login to continue
              </p>
            </div>
            <form action={action} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <TextInput
                  label="Email"
                  name="email"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                />
                <TextInput
                  label="Password"
                  name="password"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  type={showPassword ? "text" : "password"}
                  RightIcon={showPassword ? FiEye : FiEyeOff}
                  onClickRightIcon={() => setShowPassword(!showPassword)}
                />
              </div>
              <div className="flex items-center">
                <Button disabled={isPending} type="submit" title="Login" />
                <p className="ml-auto text-center josefin-sans text-xl text-[#767676] font-light hover:underline cursor-pointer">
                  Forgot your password?
                </p>
              </div>
              {data?.error && (
                <span className="josefin-sans text-red-500">
                  {" "}
                  {data?.error}{" "}
                </span>
              )}
            </form>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-0 w-1/4 border-t-[1.5px] border-[#A0A0A0]" />
            <p className="text-center josefin-sans text-xl text-[#767676]">
              Not a member yet?
            </p>
            <div className="h-0 w-1/4 border-t-[1.5px] border-[#A0A0A0]" />
          </div>
          <div className="flex justify-center">
            <Button title="Sign Up" onClick={() => console.log("Sign Up!")} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
