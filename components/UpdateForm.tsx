"use client";
import FormField from "./FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

interface User {
  id: string;
  name: string;
  email: string;
}

interface UpdateFormProps {
  user: User;
}

const schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(4),
});

type FormData = z.infer<typeof schema>;

const UpdateForm = ({ user }: UpdateFormProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user.name,
      email: user.email,
      password: "",
    },
  });

  const { control } = form;

  return (
    <div className="relative flex min-h-[80vh] items-center justify-center bg-gradient-to-b from-neutral-100 to-white px-4 dark:from-gray-950 dark:to-black">
      {/* soft background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-10%] h-64 w-[36rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-sky-400/10 via-emerald-400/10 to-indigo-400/10 blur-3xl" />
        <div className="absolute right-[10%] bottom-[5%] h-40 w-72 rounded-full bg-indigo-500/10 blur-2xl" />
      </div>

      {/* card */}
      <div className="relative w-full max-w-md">
        <div className="pointer-events-none absolute -inset-1 -z-10 rounded-3xl bg-gradient-to-r from-sky-400/15 via-emerald-400/15 to-indigo-400/15 blur-2xl" />
        <div className="rounded-3xl border border-black/5 bg-white/70 p-6 shadow-xl backdrop-blur dark:border-white/10 dark:bg-white/5">
          <header className="mb-6">
            <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl border border-black/5 bg-white shadow-sm dark:border-white/10 dark:bg-white/10">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
            </div>
            <h2 className="text-center text-xl font-semibold text-gray-900 dark:text-white">
              Profile Details
            </h2>
            <p className="mt-1 text-center text-sm text-gray-600 dark:text-gray-300">
              Keep your information tidy. Password is optional.
            </p>
          </header>

          <FormProvider {...form}>
            <form className="space-y-5">
              <FormField
                control={control}
                name="name"
                label="Full Name"
                placeholder="Enter your name"
              />

              <FormField
                control={control}
                name="email"
                label="Email Address"
                placeholder="you@example.com"
                type="email"
              />

              <FormField
                control={control}
                name="password"
                label="Password (optional)"
                placeholder="••••••••"
                type="password"
              />

              {/* divider + faux action row (no functionality change) */}
              <div className="pt-2">
                <div className="h-px w-full bg-gradient-to-r from-transparent via-black/10 to-transparent dark:via-white/10" />
                <div className="mt-3 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Your data stays private</span>
                  <span>Secure • Encrypted</span>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default UpdateForm;
