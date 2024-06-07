// components/Layout.js
"use client";
import NavbarComponent from "@/components/navbar";
import * as React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <NavbarComponent />
      {children}
    </div>
  );
}
