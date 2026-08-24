"use client";

import { useActionState } from "react";
import { login } from "@/app/admin/actions";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(login, undefined);

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center gap-6 px-6">
      <h1 className="text-2xl font-bold">Admin login</h1>
      <form action={formAction} className="flex flex-col gap-4">
        <input
          type="password"
          name="password"
          placeholder="Admin password"
          autoFocus
          className="rounded-lg border border-foreground/20 bg-background px-4 py-2 outline-none focus:border-foreground/50"
        />
        {state?.error && (
          <p className="text-sm text-red-500">{state.error}</p>
        )}
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-foreground px-4 py-2 font-medium text-background disabled:opacity-50"
        >
          {pending ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
