"use client";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { signIn } from "@/lib/auth-client";

const loginSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(6, "Minimum 6 characters").max(128),
});

function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleSubmit(data: z.infer<typeof loginSchema>) {
    setLoading(true);
    setServerError(null);
    try {
      const { error } = await signIn.email({
        email: data.email,
        password: data.password,
      });
      if (error) {
        setServerError(error.message ?? "Login failed. Please try again.");
      }
    } catch {
      setServerError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="auth-form" onSubmit={form.handleSubmit(handleSubmit)} noValidate>
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <div className="field-group">
            <label className="field-label" htmlFor="login-email">
              Email address
            </label>
            <div className={`input-wrapper ${fieldState.invalid ? "input-error" : ""}`}>
              <span className="input-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </span>
              <input
                {...field}
                id="login-email"
                type="email"
                className="auth-input"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>
            {fieldState.error && (
              <p className="field-error">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      <Controller
        name="password"
        control={form.control}
        render={({ field, fieldState }) => (
          <div className="field-group">
            <label className="field-label" htmlFor="login-password">
              Password
            </label>
            <div className={`input-wrapper ${fieldState.invalid ? "input-error" : ""}`}>
              <span className="input-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </span>
              <input
                {...field}
                id="login-password"
                type="password"
                className="auth-input"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>
            {fieldState.error && (
              <p className="field-error">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      {serverError && (
        <div className="server-error">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          {serverError}
        </div>
      )}

      <button type="submit" className="auth-submit-btn" disabled={loading} id="login-submit">
        {loading ? (
          <span className="btn-spinner" />
        ) : (
          "Sign In"
        )}
      </button>
    </form>
  );
}

export default LoginForm;
