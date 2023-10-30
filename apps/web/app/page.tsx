import React from "react";
import { Section, Title } from "ui";
import { LoginForm } from "./login-form";

export default function Page(): React.JSX.Element {
  return (
    <Section>
      <Title>Next app with auth</Title>
      <LoginForm />
    </Section>
  );
}
