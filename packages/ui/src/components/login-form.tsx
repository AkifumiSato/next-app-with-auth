import * as React from "react";

type Props = {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export function LoginForm({ onSubmit }: Props): React.JSX.Element {
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-y-3">
        <input
          className="input input-bordered w-full max-w-xs"
          name="id"
          placeholder="Your id"
          type="text"
        />
        <input
          className="input input-bordered w-full max-w-xs"
          name="id"
          placeholder="Password"
          type="password"
        />
        <button className="btn btn-primary">login</button>
      </div>
    </form>
  );
}
