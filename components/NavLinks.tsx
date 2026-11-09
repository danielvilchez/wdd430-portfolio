"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
    const pathname = usePathname();

    const links = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
        { href: "/projects", label: "Projects" },
        { href: "/contact", label: "Contact" },
    ];

    return (
        <nav aria-label="Primary navigation">
            <div className="flex gap-6">
                {links.map((link) => {
                    const isActive =
                        pathname === link.href ||
                        (link.href === "/projects" &&
                            pathname.startsWith("/projects/"));

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={
                                isActive
                                    ? "font-bold text-blue-600"
                                    : "text-gray-700 transition hover:text-blue-600"
                            }
                            aria-current={isActive ? "page" : undefined}
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}