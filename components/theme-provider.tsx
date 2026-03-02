"use client";

import * as React from "react";
import { ThemeProvider as NextThemes } from "next-themes";
import Header from "./layout/header";

function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemes>) {
  return (
    <NextThemes {...props}>
      <Header />
      <main className="min-h-auto">{children}</main>
    </NextThemes>
  );
}

export default ThemeProvider;
