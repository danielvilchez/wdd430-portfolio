import ProjectList from "@/components/ProjectList";

export default function HomePage() {
  return (
    <div>
      <section className="py-16 sm:py-24">
        <p className="mb-4 font-semibold uppercase tracking-widest text-blue-600">
          WDD 430 · Full Stack Web Development
        </p>

        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Hello, welcome to my portfolio!
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
          I am learning to build modern web applications with React,
          Next.js, TypeScript, and Tailwind CSS. This portfolio
          showcases my learning journey and projects.
        </p>

        <a
          href="#projects-heading"
          className="mt-8 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Explore my projects
        </a>
      </section>

      <ProjectList />
    </div>
  );
}
