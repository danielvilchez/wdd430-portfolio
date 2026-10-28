interface ProjectCardProps {
    title: string;
    description: string;
    technologies: string[];
    link?: string;
}

export default function ProjectCard({
    title,
    description,
    technologies,
    link,
}: ProjectCardProps) {
    return (
        <article className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <h3 className="mb-3 text-xl font-bold text-gray-900">
                {title}
            </h3>

            <p className="mb-4 flex-grow leading-7 text-gray-600">
                {description}
            </p>

            <div className="mb-5 flex flex-wrap items-center gap-2">
                {technologies.map((technology) => (
                    <span
                        key={technology}
                        className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
                    >
                        {technology}
                    </span>
                ))}
            </div>

            {link && (
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto font-semibold text-blue-600 hover:text-blue-800 hover:underline"
                >
                    View project →
                </a>
            )}
        </article>
    );
}
