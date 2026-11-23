import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getProjectById } from "@/lib/projects-db";
import { updateProject } from "@/lib/actions";

async function EditProjectForm({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const projectId = Number(id);

    if (!Number.isSafeInteger(projectId) || projectId <= 0) {
        notFound();
    }

    const project = await getProjectById(projectId);

    if (!project) {
        notFound();
    }

    return (
        <section className="mx-auto max-w-2xl py-12">
            <h1 className="mb-6 text-3xl font-bold text-gray-900">
                Edit Project
            </h1>

            <form
                action={updateProject.bind(null, id)}
                className="space-y-6"
            >
                <div>
                    <label htmlFor="title" className="mb-2 block font-medium text-gray-700">
                        Project Title
                    </label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        required
                        minLength={2}
                        maxLength={255}
                        defaultValue={project.title}
                        className="w-full rounded-lg border border-gray-300 p-3"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="mb-2 block font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows={4}
                        defaultValue={project.description ?? ""}
                        className="w-full rounded-lg border border-gray-300 p-3"
                    />
                </div>

                <div>
                    <label htmlFor="type" className="mb-2 block font-medium text-gray-700">
                        Project Type
                    </label>
                    <select
                        id="type"
                        name="type"
                        required
                        defaultValue={project.type}
                        className="w-full rounded-lg border border-gray-300 p-3"
                    >
                        <option value="opensource">Open Source</option>
                        <option value="school">School</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="technologies" className="mb-2 block font-medium text-gray-700">
                        Technologies
                    </label>
                    <input
                        id="technologies"
                        name="technologies"
                        type="text"
                        required
                        defaultValue={project.technologies.join(", ")}
                        className="w-full rounded-lg border border-gray-300 p-3"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                        Separate technologies with commas.
                    </p>
                </div>

                <div>
                    <label htmlFor="link" className="mb-2 block font-medium text-gray-700">
                        Project Link (optional)
                    </label>
                    <input
                        id="link"
                        name="link"
                        type="url"
                        maxLength={500}
                        defaultValue={project.link ?? ""}
                        className="w-full rounded-lg border border-gray-300 p-3"
                    />
                </div>

                <div className="flex gap-4">
                    <button
                        type="submit"
                        className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
                    >
                        Save Changes
                    </button>

                    <Link
                        href="/projects"
                        className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:bg-gray-100"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </section>
    );
}

export default function EditProjectPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    return (
        <Suspense fallback={<p className="py-12 text-center">Loading project...</p>}>
            <EditProjectForm params={params} />
        </Suspense>
    );
}
