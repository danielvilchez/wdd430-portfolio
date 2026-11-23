
"use client";

import { useActionState } from "react";
import { authenticate } from "@/lib/actions";

export function LoginForm() {
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined
    );

    return (
        <form action={formAction} className="space-y-6">
            <div>
                <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    Email
                </label>

                <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    className="w-full rounded-md border border-gray-300 px-4 py-2"
                />
            </div>

            <div>
                <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    Password
                </label>

                <input
                    id="password"
                    type="password"
                    name="password"
                    minLength={6}
                    required
                    className="w-full rounded-md border border-gray-300 px-4 py-2"
                />
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="w-full rounded-md bg-gray-900 px-4 py-2 font-medium text-white hover:bg-gray-700 disabled:opacity-50"
            >
                {isPending ? "Signing in..." : "Sign In"}
            </button>

            {errorMessage && (
                <p role="alert" className="text-sm text-red-600">
                    {errorMessage}
                </p>
            )}
        </form>
    );
}
