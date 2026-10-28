export default function Footer() {
    return (
        <footer className="border-t border-gray-200 bg-gray-50">
            <div className="mx-auto max-w-6xl px-6 py-6 text-center text-sm text-gray-600">
                <p>
                    © {new Date().getFullYear()} My Portfolio. Built with Next.js and Tailwind CSS.
                </p>
            </div>
        </footer>
    );
}
