"use client";

import { FormField } from "@/components/common/FormField";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import Image from "next/image";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";

export default function LoginPage() {
  const loginSchema = z.object({
    usernameOrEmail: z
      .string()
      .min(5, "Username or email must be at least 5 characters.")
      .max(32, "Username or email must be at most 32 characters."),
    password: z
      .string()
      .min(20, "Password must be at least 20 characters.")
      .max(100, "Password must be at most 100 characters."),
  });
  const form = useForm({
    defaultValues: {
      usernameOrEmail: "",
      password: "",
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }) => {
      toast("You submitted the following values:", {
        description: (
          <pre className="bg-code text-code-foreground mt-2 w-125 overflow-x-auto rounded-md p-4">
            <code>{JSON.stringify(value, null, 2)}</code>
          </pre>
        ),
        position: "bottom-right",
        classNames: {
          content: "flex flex-col gap-2",
        },
        style: {
          "--border-radius": "calc(var(--radius)  + 4px)",
        } as React.CSSProperties,
      });
    },
  });
  const fieldDefinitions = [
    {
      name: "usernameOrEmail",
      label: "Username or Email",
      placeholder: "Enter your username or email",
      type: "text",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      type: "password",
    },
  ];
  return (
    <div
      className="relative min-h-[90vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-zinc-950 [--grid-color:rgba(0,0,0,0.12)] dark:[--grid-color:rgba(255,255,255,0.08)]"
      style={{
        backgroundImage: `
      linear-gradient(var(--grid-color) 1px, transparent 1px),
      linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)
    `,
        backgroundSize: "50px 50px",
      }}
    >
      {/* Top fade */}
      <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-white dark:from-zinc-950 to-transparent pointer-events-none z-10" />
      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-white dark:from-zinc-950 to-transparent pointer-events-none z-10" />
      {/* Outer glow layer */}
      <div className="relative">
        <div
          className="absolute -inset-1.5 rounded-[20px] blur-xl opacity-70"
          style={{
            background:
              "conic-gradient(from var(--angle2), transparent 35%, rgba(167,209,41,0.55) 48%, rgba(167,209,41,0.85) 50%, rgba(167,209,41,0.55) 52%, transparent 65%)",
            animation: "spin 3s linear infinite",
          }}
        />

        {/* Border beam wrapper (2px padding = border thickness) */}
        <div
          className="relative p-0.5 rounded-2xl"
          style={{
            background:
              "conic-gradient(from var(--angle), transparent 30%, #A7D129 45%, #EEFABD 50%, #616F39 55%, transparent 70%)",
            animation: "spin 3s linear infinite",
          }}
        >
          {/* Card */}
          <div className="relative flex max-w-4xl bg-white dark:bg-zinc-950 rounded-[14px] overflow-hidden">
            {/* Left — Image */}
            <div className="hidden md:flex w-1/2">
              <Image
                src="/login.png"
                alt="Chefalio Login"
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right — Form */}
            <div className="flex w-full md:w-1/2 items-center justify-center p-8">
              <div className="w-full max-w-md space-y-6">
                <div>
                  <h1 className="text-2xl font-semibold">Sign In</h1>
                  <p className="text-sm text-gray-500">
                    Welcome back! Please enter your details to sign in to your
                    account.
                  </p>
                </div>

                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                  }}
                >
                  <FieldGroup>
                    {fieldDefinitions.map((fieldDef) => (
                      <FormField
                        key={fieldDef.name}
                        form={form}
                        {...fieldDef}
                      />
                    ))}
                  </FieldGroup>

                  <Button type="submit" className="w-full rounded-lg py-5">
                    Sign In
                  </Button>
                </form>

                <p className="text-sm text-center text-gray-500">
                  Don&apos;t have an account?{" "}
                  <span className="text-primary font-medium cursor-pointer hover:text-orange-400">
                    Sign up
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Keyframe + @property for conic-gradient animation */}
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
