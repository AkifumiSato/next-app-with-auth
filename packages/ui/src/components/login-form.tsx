import * as React from "react";

export function LoginForm(): React.JSX.Element {
  return (
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
  );
}
