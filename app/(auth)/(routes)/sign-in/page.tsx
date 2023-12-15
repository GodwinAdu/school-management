import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import LoginForm from "@/components/login-forms/login-form";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Only Administrators can login here.",
};

export default function AdminLoginPage() {
  return (
    <>
      <div className="container relative min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 ">
        <Link
          href="/examples/authentication"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "absolute right-4 top-4 md:right-8 md:top-8 pb-4 md:pb-0"
          )}
        >
          Only Members
        </Link>
        <div className="relative hidden md:block h-full flex-col bg-muted p-10 text-white dark:border-r  lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            School Name
          </div>
        </div>
        <div className="flex flex-col items-center justify-center pt-16 lg:pt-0">
          <div className="mx-auto flex w-full flex-col justify-center space-y-4 sm:w-full md:w-[350px]">
            <div className="flex flex-col space-y-4 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Login to your Account
              </h1>
              <p className="text-xs text-muted-foreground">
                Enter your usernamre and password to login to your account.
              </p>
            </div>
            <LoginForm />
            <p className="px-6 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
