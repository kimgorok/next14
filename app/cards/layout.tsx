import React from "react";
import "../../styles/globals.css";
import MainBtn from "../components/MainBtn";

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
      <body>
        <MainBtn text="뒤로가기" url="/" />
        {children}
      </body>
    </html>
  );
}
