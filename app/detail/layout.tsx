import React from "react";
import MainBtn from "../components/MainBtn";

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
      <body>
        <MainBtn text="처음으로" url="/" />
        {children}
      </body>
    </html>
  );
}
