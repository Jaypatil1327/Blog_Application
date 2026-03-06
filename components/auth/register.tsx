"use client";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { signUp } from "@/lib/auth-client";
import { RegisterFormProps } from "./auth-layout";

const registerSchema = z
  .object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6, "To short!!").max(10, "To Big!!"),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password Does'nt match",
    path: ["confirm_password"],
  });

function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [loading, isLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  async function handleSubmit(data: z.infer<typeof registerSchema>) {
    isLoading(true);
    setServerError(null);

    try {
      const { error } = await signUp.email({
        name: data.name,
        password: data.password,
        email: data.email,
      });
      if (error) {
        setServerError(error.message ?? "Registration failed. Please try again.");
      } else {
        onSuccess();
      }
    } catch (error) {
      setServerError("An unexpected error occurred. Please try again.");
      console.log(error);
    } finally {
      isLoading(false);
    }
  }
  return (
    <div>
      <form
        className="w-full flex flex-col gap-3"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FieldGroup className="gap-4">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Name</FieldLabel>
                <Input {...field} placeholder="enter name"></Input>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]}></FieldError>
                )}
              </Field>
            )}
          />

          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input {...field} placeholder="enter email"></Input>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]}></FieldError>
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Password</FieldLabel>
                <Input {...field} placeholder="enter password"></Input>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]}></FieldError>
                )}
              </Field>
            )}
          />

          <Controller
            name="confirm_password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Confirm Password</FieldLabel>
                <Input {...field} placeholder="confirm your password"></Input>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]}></FieldError>
                )}
              </Field>
            )}
          />
        </FieldGroup>

        {serverError && (
          <p className="text-sm text-red-500 text-center font-medium">
            {serverError}
          </p>
        )}

        <Button type="submit" disabled={loading ? true : false}>
          Register
        </Button>
      </form>
    </div>
  );
}

export default RegisterForm;
