import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6).max(10),
});

function LoginForm() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function handleSubmit(data: { email: string; password: string }) {
    console.log(data);
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

        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}

export default LoginForm;
