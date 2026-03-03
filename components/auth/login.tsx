"use client";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6).max(10),
});

function LoginForm() {
  const [loading, isLoading] = useState(false);
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function handleSubmit(data: { email: string; password: string }) {
    isLoading(true);
    try {
      console.log(data);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log(error);
      }
    }
  }

  return (
    <div className="mt-2 w-full">
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full flex flex-col gap-4"
      >
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input {...field} placeholder="enter email" autoCorrect="on" />
              </Field>
            )}
          />

          <Controller
            name="password"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel>Password</FieldLabel>
                <Input
                  {...field}
                  placeholder="enter password"
                  autoCorrect="off"
                />
              </Field>
            )}
          />
        </FieldGroup>

        <Button type="submit" disabled={loading ? true : false}>
          Login
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
