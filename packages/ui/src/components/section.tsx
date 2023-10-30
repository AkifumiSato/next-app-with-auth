import * as React from "react";

type Props = {
  children?: React.ReactNode;
};

export function Section({ children }: Props): React.JSX.Element {
  return <section className="flex flex-col gap-y-7">{children}</section>;
}
