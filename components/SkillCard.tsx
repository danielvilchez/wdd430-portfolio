interface SkillCardProps {
    title: string;
    description: string;
}

export default function SkillCard({
    title,
    description,
}: SkillCardProps) {
    return (
        <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="mb-2 text-lg font-bold text-gray-900">
                {title}
            </h3>

            <p className="leading-7 text-gray-600">
                {description}
            </p>
        </article>
    );
}
