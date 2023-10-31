import React from "react";
import { LoginForm, Section, Title } from "ui";

// eslint-disable-next-line @typescript-eslint/require-await -- todo: remove this
async function submitAction(data: unknown): Promise<void> {
  "use server";

  // eslint-disable-next-line no-console -- todo: remove this
  console.log(data);
}

export default function Page(): React.JSX.Element {
  return (
    <Section>
      <Title>Next app with auth</Title>
      <form action={submitAction}>
        <LoginForm />
      </form>
    </Section>
  );
}
