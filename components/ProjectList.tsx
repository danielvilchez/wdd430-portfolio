import ProjectCard from "./ProjectCard";

const projects = [
    {
        title: "My Next.js Portfolio",
        description:
            "A portfolio website created for WDD 430 to practice building web applications with reusable components and modern tools.",
        technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
        link: "https://github.com/danielvilchez/wdd430-portfolio",
    },
    {
        title: "React DOM Practice",
        description:
            "A learning project focused on understanding React elements, JSX, and how components render content in the browser.",
        technologies: ["React", "JavaScript", "HTML"],
    },
];

export default function ProjectList() {
    return (
        <section
            aria-labelledby="projects-heading"
            className="py-12"
        >
            <div className="mb-8">
                <h2
                    id="projects-heading"
                    className="text-3xl font-bold text-gray-900"
                >
                    My Projects
                </h2>

                <p className="mt-3 text-gray-600">
                    Here are some of the projects I am working on as I learn web development.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {projects.map((project) => (
                    <ProjectCard
                        key={project.title}
                        title={project.title}
                        description={project.description}
                        technologies={project.technologies}
                        link={project.link}
                    />
                ))}
            </div>
        </section>
    );
}
