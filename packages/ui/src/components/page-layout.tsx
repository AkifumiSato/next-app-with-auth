import * as React from "react";

type Props = {
  children?: React.ReactNode;
};

export function PageLayout({ children }: Props): React.JSX.Element {
  return (
    <div className="px-3 py-5 flex flex-row justify-center">
      <main className="w-10/12">{children}</main>
    </div>
  );
}
