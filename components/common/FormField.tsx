/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Field, FieldDescription, FieldLabel } from "../ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "../ui/input-group";
import { Input } from "../ui/input";
import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react/dist/ssr";

interface FormFieldProps {
  form: any;
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  type?: string;
  rows?: number;
  maxLength?: number;
}

export const FormField = ({
  form,
  name,
  label,
  placeholder,
  description,
  type = "text",
  rows,
  maxLength,
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form.Field name={name}>
      {(field: any) => {
        const isInvalid =
          field.state.meta.isTouched && !field.state.meta.isValid;
        const isTextArea = type === "textarea";
        const isPassword = type === "password";

        return (
          <Field data-invalid={isInvalid}>
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>

            {isTextArea ? (
              <InputGroup>
                <InputGroupTextarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder={placeholder}
                  rows={rows || 4}
                  className="min-h-24 resize-none"
                  aria-invalid={isInvalid}
                />
                {maxLength && (
                  <InputGroupAddon align="block-end">
                    <InputGroupText className="tabular-nums">
                      {field.state.value.length}/{maxLength} characters
                    </InputGroupText>
                  </InputGroupAddon>
                )}
              </InputGroup>
            ) : isPassword ? (
              <div className="relative">
                <Input
                  id={field.name}
                  name={field.name}
                  type={showPassword ? "text" : "password"}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder={placeholder}
                  aria-invalid={isInvalid}
                  autoComplete="off"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-0 flex items-center justify-center w-10 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500 rounded-r"
                >
                  {showPassword ? (
                    <EyeSlashIcon size={32} weight="fill" className="w-4 h-4" />
                  ) : (
                    <EyeIcon size={32} weight="fill" className="w-4 h-4" />
                  )}
                </button>
              </div>
            ) : (
              <Input
                id={field.name}
                name={field.name}
                type={type}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder={placeholder}
                aria-invalid={isInvalid}
                autoComplete="off"
              />
            )}

            {description && <FieldDescription>{description}</FieldDescription>}

            <div>
              {isInvalid && (
                <p className="text-red-500 text-sm">
                  {field.state.meta.errors
                    .map((e: any) =>
                      typeof e === "string" ? e : (e?.message ?? String(e)),
                    )
                    .join(", ")}
                </p>
              )}
            </div>
          </Field>
        );
      }}
    </form.Field>
  );
};
