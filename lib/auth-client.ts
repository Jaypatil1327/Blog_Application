import { createAuthClient } from "better-auth/client";

export const client = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
});

export const { signIn, signOut, useSession, signUp } = client;
