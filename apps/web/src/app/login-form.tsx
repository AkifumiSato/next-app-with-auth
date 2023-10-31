"use client";

import React from "react";
import type { JSX } from "react";
import { LoginForm as LoginFormUi } from "ui";

export function LoginForm(): JSX.Element {
  function onSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    // eslint-disable-next-line no-console -- todo: remove this
    console.log(event);
  }
  return <LoginFormUi onSubmit={onSubmit} />;
}
