import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact",
    description:
        "Get in touch with me to discuss web development, projects, and collaboration opportunities.",
};

export default function ContactPage() {
    return (
        <section className="py-12">
            <h1 className="mb-6 text-3xl font-bold text-gray-900">
                Contact Me
            </h1>

            <p className="text-gray-600">
                Welcome to my contact page. Feel free to reach out to me.
            </p>
        </section>
    );
}