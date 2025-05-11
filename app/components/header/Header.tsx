import React from "react";

export default function Header({ children }: { children: React.ReactNode }) {
  return <header className="container  mx-auto my-2 ">{children}</header>;
}
