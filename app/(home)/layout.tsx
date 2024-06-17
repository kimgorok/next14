import React from "react";
import "../../styles/globals.css";
import { metadata } from "./metadata";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="kr">
      <head>
        <title>{metadata.title}</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
