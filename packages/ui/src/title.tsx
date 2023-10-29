import * as React from "react";

type Props = {
  children: React.ReactNode;
};

export function Title({ children }: Props): React.JSX.Element {
  return <h1 className="text-3xl font-bold">{children}</h1>;
}
