import Link from "next/link";

export default function ProjectsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section>
            <nav className="mb-8 flex gap-6 border-b border-gray-200 pb-4">
                <Link
                    href="/projects"
                    className="text-gray-700 transition hover:text-blue-600"
                >
                    Overview
                </Link>

                <Link
                    href="/projects/opensource"
                    className="text-gray-700 transition hover:text-blue-600"
                >
                    Open Source
                </Link>

                <Link
                    href="/projects/school"
                    className="text-gray-700 transition hover:text-blue-600"
                >
                    School
                </Link>
            </nav>

            {children}
        </section>
    );
}