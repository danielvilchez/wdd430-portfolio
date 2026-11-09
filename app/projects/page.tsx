import { getProjects } from "@/lib/projects-db";

export const instant = false;

export default async function ProjectsPage() {
    const projects = await getProjects();

    return (
        <section className="py-12">
            <h1 className="mb-6 text-3xl font-bold text-gray-900">
                My Projects
            </h1>

            <p className="mb-8 text-gray-600">
                Welcome to my projects page. Here you can explore my open source
                contributions and school projects.
            </p>

            <div className="grid gap-6 md:grid-cols-2">
                {projects.map((project) => (
                    <article
                        key={project.id}
                        className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
                    >
                        <h2 className="mb-2 text-xl font-bold text-gray-900">
                            {project.title}
                        </h2>

                        <p className="mb-4 text-gray-600">
                            {project.description}
                        </p>

                        <p className="mb-2 text-sm text-gray-500">
                            Type: {project.type}
                        </p>

                        <p className="text-sm text-gray-500">
                            Technologies: {project.technologies.join(", ")}
                        </p>

                        {project.link && (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 inline-block text-blue-600 hover:underline"
                            >
                                View Project
                            </a>
                        )}
                    </article>
                ))}
            </div>
        </section>
    );
}