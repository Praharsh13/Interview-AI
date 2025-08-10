import React, { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { getCurrentUser, isAuthenticated } from "@/lib/actions/auth";
import { redirect } from "next/navigation";
import ProfileDropdown from "@/components/ProfileDropdown";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  const user = await getCurrentUser();
  if (!isUserAuthenticated) redirect("/sign-in");

  const year = new Date().getFullYear();

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-neutral-100 to-white dark:from-gray-950 dark:to-black">
      {/* subtle radial accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-10%] h-64 w-[36rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500/10 via-sky-400/10 to-emerald-400/10 blur-3xl" />
        <div className="absolute right-[10%] bottom-[5%] h-40 w-72 rounded-full bg-indigo-500/10 blur-2xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/70 backdrop-blur-md transition dark:border-white/10 dark:bg-black/40">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link
            href="/"
            aria-label="Go to InterviewAI home"
            className="group flex items-center gap-3"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/5 bg-white shadow-sm transition group-hover:shadow-md dark:border-white/10 dark:bg-black">
              <Image
                src="/logo.svg"
                alt="InterviewAI Logo"
                width={24}
                height={24}
                priority
              />
            </span>
            <h1 className="text-lg font-semibold tracking-tight text-gray-900 transition group-hover:opacity-90 dark:text-white">
              InterviewAI
            </h1>
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Keep your dropdown exactly as-is */}
            {user?.id && <ProfileDropdown userId={user.id} />}
          </div>
        </nav>
      </header>

      {/* Main */}
      <main className="mx-auto mt-6 w-full max-w-7xl px-4 pb-16">{children}</main>

      {/* Footer */}
      <footer className="mt-auto border-t border-black/5 bg-white/60 backdrop-blur-sm dark:border-white/10 dark:bg-black/40">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 text-sm">
          <p className="text-gray-600 dark:text-gray-300">
            © {year} <span className="font-medium">CareerReady AI</span>
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Created by <span className="font-semibold">Praharsh Pranjal</span> · All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default RootLayout;
