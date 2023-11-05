import React from "react";

// disabled cache
export const revalidate = 0;

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return <>{children}</>;
}
