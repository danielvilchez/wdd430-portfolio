import SkillCard from "@/components/SkillCard";

export default function AboutPage() {
    return (
        <div className="py-12 sm:py-16">
            <section className="mb-12">
                <p className="mb-3 font-semibold uppercase tracking-widest text-blue-600">
                    About me
                </p>

                <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                    My Learning Journey
                </h1>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">
                    I am a student developing my skills in web development.
                    Through WDD 430, I am learning how to create structured,
                    reusable, and responsive applications using modern web
                    technologies.
                </p>
            </section>

            <section aria-labelledby="skills-heading">
                <h2
                    id="skills-heading"
                    className="mb-6 text-2xl font-bold text-gray-900"
                >
                    What I am learning
                </h2>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <SkillCard
                        title="React and Next.js"
                        description="Learning to organize web applications into reusable components and pages."
                    />

                    <SkillCard
                        title="TypeScript"
                        description="Learning to define data types and make components more predictable."
                    />

                    <SkillCard
                        title="Tailwind CSS"
                        description="Learning to create responsive layouts and consistent visual styles."
                    />

                    <SkillCard
                        title="Full Stack Development"
                        description="Learning how pages, components, and API routes work together in a web application."
                    />
                </div>
            </section>
        </div>
    );
}
