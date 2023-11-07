import React from "react";
import { Section, Title } from "ui";
import { getSession } from "../session";

export default function Page(): React.JSX.Element {
  const session = getSession();
  return (
    <Section>
      <Title>User page</Title>
      <p>{JSON.stringify(session?.user ?? {})}</p>
    </Section>
  );
}
