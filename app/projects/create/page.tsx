import CreateProjectForm from "./create-project-form";

export default function CreateProjectPage() {
    return (
        <section className="mx-auto max-w-2xl py-12">
            <h1 className="mb-6 text-3xl font-bold text-gray-900">
                Create Project
            </h1>

            <CreateProjectForm />
        </section>
    );
}
