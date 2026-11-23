
import { deleteProject } from "@/lib/actions";
import { auth } from "@/auth";
import Link from "next/link";
import Pagination from "@/components/projects/Pagination";
import { Suspense } from "react";
import { connection } from "next/server";
import {
    fetchFilteredProjects,
    fetchProjectsPages,
} from "@/lib/projects-db";
import ProjectSearch from "@/components/projects/ProjectSearch";

async function ProjectsContent({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {
    await connection();

    const session = await auth();
    const isOwner = !!session?.user;

    const projects = await fetchFilteredProjects(query, currentPage);

    return (
        <div className="grid gap-6 md:grid-cols-2">
            {projects.length > 0 ? (
                projects.map((project) => (
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

                        {isOwner && (
                            <div className="mt-6 flex gap-3">
                                <Link
                                    href={`/projects/${project.id}/edit`}
                                    className="rounded-lg bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
                                >
                                    Edit
                                </Link>

                                <form action={deleteProject.bind(null, project.id.toString())}>
                                    <button
                                        type="submit"
                                        className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </form>
                            </div>
                        )}
                    </article>
                ))
            ) : (
                <p className="text-gray-600">
                    No projects found.
                </p>
            )}
        </div>
    );
}

async function ProjectsPagination({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {
    await connection();

    const totalPages = await fetchProjectsPages(query);
    const safePage = Math.min(currentPage, Math.max(totalPages, 1));

    return (
        <>
            <ProjectsContent
                query={query}
                currentPage={safePage}
            />
            <Pagination totalPages={totalPages} />
        </>
    );
}

async function ProjectsPageContent({
    searchParams,
}: {
    searchParams: Promise<{ query?: string; page?: string }>;
}) {
    const params = await searchParams;

    const query = (params.query ?? "").trim().slice(0, 100);

    const requestedPage = Number(params.page);
    const currentPage =
        Number.isSafeInteger(requestedPage) && requestedPage > 0
            ? requestedPage
            : 1;

    const session = await auth();
    const isOwner = !!session?.user;

    return (
        <section className="py-12">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">
                    My Projects
                </h1>

                {isOwner && (
                    <Link
                        href="/projects/create"
                        className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
                    >
                        + Add Project
                    </Link>
                )}
            </div>

            <p className="mb-8 text-gray-600">
                Welcome to my projects page. Here you can explore my open source
                contributions and school projects.
            </p>

            <Suspense fallback={<p>Loading search...</p>}>
                <ProjectSearch />
            </Suspense>

            <Suspense fallback={<p>Loading projects...</p>}>
                <ProjectsPagination
                    query={query}
                    currentPage={currentPage}
                />
            </Suspense>
        </section>
    );
}

export default async function ProjectsPage(props: {
    searchParams: Promise<{ query?: string; page?: string }>;
}) {
    return (
        <Suspense fallback={<p>Loading projects page...</p>}>
            <ProjectsPageContent searchParams={props.searchParams} />
        </Suspense>
    );
}
