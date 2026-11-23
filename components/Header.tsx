
import Link from "next/link";
import { connection } from "next/server";
import NavLinks from "./NavLinks";
import { auth } from "@/auth";
import { SignOutButton } from "./sign-out-button";

export default async function Header() {
    await connection();

    const session = await auth();

    return (
        <header className="border-b border-gray-200 bg-white">
            <nav
                className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5"
                aria-label="Main navigation"
            >
                <Link
                    href="/"
                    className="text-xl font-bold text-gray-900"
                >
                    My Portfolio
                </Link>

                <div className="flex items-center gap-4">
                    <NavLinks />

                    {session?.user && <SignOutButton />}
                </div>
            </nav>
        </header>
    );
}
