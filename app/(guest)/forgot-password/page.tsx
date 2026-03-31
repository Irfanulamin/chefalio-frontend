"use client";

import { FormField } from "@/components/common/FormField";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { FingerprintIcon } from "@phosphor-icons/react/dist/ssr";

export default function ForgotPasswordPage() {
  const { isLoading } = useAuth();

  const forgotPasswordSchema = z.object({
    email: z.email("Invalid email format"),
  });

  const form = useForm({
    defaultValues: { email: "" },
    validators: { onSubmit: forgotPasswordSchema },
    onSubmit: async ({ value }) => {
      try {
        //await forgotPassword(value);
        toast.success("Reset link sent! Check your email.", {
          position: "bottom-right",
        });
      } catch (err: Error | unknown) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.";
        toast.error(errorMessage, { position: "bottom-right" });
      }
    },
  });

  return (
    <div
      className="relative min-h-[90vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-zinc-950 [--grid-color:rgba(0,0,0,0.07)] dark:[--grid-color:rgba(255,255,255,0.05)]"
      style={{
        backgroundImage: `
          linear-gradient(var(--grid-color) 1px, transparent 1px),
          linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
      }}
    >
      {/* Top & bottom fade */}
      <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-white dark:from-zinc-950 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-white dark:from-zinc-950 to-transparent pointer-events-none z-10" />

      <div className="relative z-20">
        {/* Spinning glow halo — softened, stays behind */}
        <div
          className="absolute -inset-2 rounded-[22px] blur-2xl opacity-50"
          style={{
            background:
              "conic-gradient(from var(--angle2), transparent 30%, rgba(167,209,41,0.4) 47%, rgba(167,209,41,0.75) 50%, rgba(167,209,41,0.4) 53%, transparent 70%)",
            animation: "spin 4s linear infinite",
          }}
        />

        {/* Spinning border ring */}
        <div
          className="relative p-[1.5px] rounded-2xl"
          style={{
            background:
              "conic-gradient(from var(--angle), transparent 28%, #A7D129 44%, #EEFABD 50%, #7A8F3A 56%, transparent 72%)",
            animation: "spin 4s linear infinite",
          }}
        >
          {/* Card */}
          <div className="relative bg-white dark:bg-zinc-950 rounded-[14px] px-8 py-8 w-104 max-w-full">
            {/* Inner ambient glow at top */}
            <div
              className="absolute inset-x-0 top-0 h-24 rounded-t-[14px] pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(167,209,41,0.12) 0%, transparent 100%)",
              }}
            />

            {/* Icon */}
            <div className="mb-5">
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[#A7D129]/10 dark:bg-[#A7D129]/15">
                <FingerprintIcon
                  size={26}
                  weight="fill"
                  className="text-[#7A9A20] dark:text-[#A7D129]"
                />
              </div>
            </div>

            {/* Heading */}
            <div className="mb-6">
              <h1 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                Forgot your password?
              </h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1.5 leading-relaxed">
                Enter your email and we&apos;ll send you a link to reset your
                password.
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-zinc-100 dark:bg-zinc-800 mb-6" />

            {/* Form */}
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
            >
              <FieldGroup>
                <FormField
                  form={form}
                  name="email"
                  label="Email address"
                  placeholder="you@example.com"
                  type="email"
                />
              </FieldGroup>

              <Button
                type="submit"
                className="w-full rounded-lg py-5 font-bold text-sm tracking-wide"
                disabled={isLoading}
              >
                {isLoading ? "Sending…" : "Send Reset Link"}
              </Button>

              <p className="text-center text-sm text-zinc-400 dark:text-zinc-500">
                Remembered it?{" "}
                <Link
                  href="/login"
                  className="font-medium text-zinc-800 dark:text-zinc-200 hover:underline underline-offset-2"
                >
                  Back to sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @property --angle2 {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes spin {
          to { --angle: 360deg; --angle2: 360deg; }
        }
      `}</style>
    </div>
  );
}
