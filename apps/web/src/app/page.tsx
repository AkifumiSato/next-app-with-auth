import Link from "next/link";
import React from "react";
import { Section, Title } from "ui";

export default function Page(): React.JSX.Element {
  return (
    <Section>
      <Title>Next app with auth</Title>
      <article className="prose">
        <ul>
          <li>
            <Link href="/user">user page</Link>
          </li>
        </ul>
      </article>
    </Section>
  );
}
