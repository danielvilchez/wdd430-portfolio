import Link from "next/link";
import NavLinks from "./NavLinks";

export default function Header() {
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

                <NavLinks />
            </nav>
        </header>
    );
}