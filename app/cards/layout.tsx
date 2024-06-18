import React from "react";
import "../../styles/globals.css";

const metadata = {
  title: "카드",
};

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
