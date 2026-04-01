"use client";

import { FormField } from "@/components/common/FormField";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { LockKeyIcon } from "@phosphor-icons/react/dist/ssr";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const resetToken = searchParams.get("token") ?? "";
  const { resetPassword, isLoading } = useAuth();

  const resetPasswordSchema = z
    .object({
      newPassword: z.string().min(6, "Password must be at least 6 characters"),
      confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const form = useForm({
    defaultValues: { newPassword: "", confirmPassword: "" },
    validators: { onSubmit: resetPasswordSchema },
    onSubmit: async ({ value }) => {
      if (!resetToken) {
        toast.error(
          "Reset token is missing. Please use the link from your email.",
          {
            position: "bottom-right",
          },
        );
        return;
      }

      try {
        await resetPassword({ resetToken, newPassword: value.newPassword });
        toast.success("Your password has been reset successfully.", {
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
        {/* Spinning glow halo */}
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
          <div className="relative bg-white dark:bg-zinc-950 rounded-[14px] px-8 py-8 w-full lg:w-104 max-w-full">
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
                <LockKeyIcon
                  size={26}
                  weight="fill"
                  className="text-[#7A9A20] dark:text-[#A7D129]"
                />
              </div>
            </div>

            {/* Heading */}
            <div className="mb-6">
              <h1 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                Set a new password
              </h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1.5 leading-relaxed">
                Choose a strong password. It must be at least 6 characters long.
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
                  name="newPassword"
                  label="New password"
                  placeholder="At least 6 characters"
                  type="password"
                />
                <FormField
                  form={form}
                  name="confirmPassword"
                  label="Confirm new password"
                  placeholder="Repeat your password"
                  type="password"
                />
              </FieldGroup>

              <Button
                type="submit"
                className="w-full rounded-lg py-5 font-bold text-sm tracking-wide"
                disabled={isLoading || !resetToken}
              >
                {isLoading ? "Resetting…" : "Reset Password"}
              </Button>

              <p className="text-center text-sm text-zinc-400 dark:text-zinc-500">
                Back to{" "}
                <Link
                  href="/login"
                  className="font-medium text-zinc-800 dark:text-zinc-200 hover:underline underline-offset-2"
                >
                  Sign in
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

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}
