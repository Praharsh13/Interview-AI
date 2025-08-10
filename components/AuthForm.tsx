"use client";
import React from "react";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import { toast } from "sonner";

import FormField from "./FormInput";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/client";
import { SignUp, signIn } from "@/lib/actions/auth";
import { useRouter } from "next/navigation";

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(4),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-up") {
        const { name, email, password } = values;
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

        const result = await SignUp({
          uid: userCredentials.user.uid,
          name: name!,
          email,
          password,
        });

        if (!result?.success) {
          toast.error(result?.message);
          return;
        }
        toast.message("Account created successfully. Please sign in");
        router.push("/sign-in");
      }

      if (type === "sign-in") {
        const { email, password } = values;
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        const tokenID = await userCredentials.user.getIdToken();
        if (!tokenID) {
          toast.error("Login fail , Please try again");
          return;
        }
        await signIn({ email, tokenID });
        toast.success("Signed in successfully.");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(`There was some errors ${error}`);
    }
  }

  const isSignIn = type === "sign-in";

  return (
    <div className="relative">
      {/* subtle page glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-14%] h-64 w-[38rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-sky-400/10 via-emerald-400/10 to-indigo-400/10 blur-3xl" />
      </div>

      <div className="rounded-3xl border border-black/5 bg-white/70 p-0 shadow-xl backdrop-blur dark:border-white/10 dark:bg-white/5 lg:min-w-[566px]">
        {/* header */}
        <div className="flex flex-col gap-6 px-8 py-12">
          <div className="flex items-center justify-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl border border-black/5 bg-white shadow-sm dark:border-white/10 dark:bg-white/10">
              <Image src="/logo.svg" alt="logo" height={22} width={22} priority />
            </span>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">InterviewAI</h2>
          </div>

          <h3 className="text-center text-xl font-semibold text-gray-900 dark:text-white">
            {isSignIn ? "Welcome back" : "Create your account"}
          </h3>
          <p className="text-center text-sm text-gray-600 dark:text-gray-300">
            Practice job interviews with AI — instant feedback, role-based questions.
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="form mt-2 w-full space-y-5">
              {!isSignIn && (
                <FormField
                  control={form.control}
                  name="name"
                  label="Full Name"
                  placeholder="Your name"
                />
              )}

              <FormField
                control={form.control}
                name="email"
                label="Email"
                placeholder="you@example.com"
                type="email"
              />

              <FormField
                control={form.control}
                name="password"
                label="Password"
                placeholder="••••••••"
                type="password"
              />

              {/* divider */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-black/10 to-transparent dark:via-white/10" />

              <Button
                className="btn inline-flex w-full items-center justify-center rounded-2xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-gray-800 dark:bg-white dark:text-black hover:brightness-105"
                type="submit"
              >
                {isSignIn ? "Sign In" : "Create Account"}
              </Button>
            </form>
          </Form>

          <p className="text-center text-sm text-gray-600 dark:text-gray-300">
            {isSignIn ? "No account yet?" : "Already have an account?"}
            <Link
              href={!isSignIn ? "/sign-in" : "/sign-up"}
              className="ml-2 font-semibold text-sky-600 underline-offset-4 hover:underline dark:text-sky-400"
            >
              {!isSignIn ? "Sign In" : "Sign Up"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
