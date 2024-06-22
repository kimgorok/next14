import React from "react";

const metadata = {
  title: "출현한 포켓몬",
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
