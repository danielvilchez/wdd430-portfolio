export default function Loading() {
    return (
        <section className="animate-pulse py-8">
            <div className="mb-6 h-9 w-64 rounded bg-gray-200" />

            <div className="mb-8 space-y-2">
                <div className="h-4 w-full rounded bg-gray-200" />
                <div className="h-4 w-3/4 rounded bg-gray-200" />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg border border-gray-200 p-6">
                    <div className="mb-4 h-6 w-3/4 rounded bg-gray-200" />
                    <div className="mb-2 h-4 w-full rounded bg-gray-200" />
                    <div className="mb-4 h-4 w-2/3 rounded bg-gray-200" />
                    <div className="h-4 w-1/2 rounded bg-gray-200" />
                </div>

                <div className="rounded-lg border border-gray-200 p-6">
                    <div className="mb-4 h-6 w-3/4 rounded bg-gray-200" />
                    <div className="mb-2 h-4 w-full rounded bg-gray-200" />
                    <div className="mb-4 h-4 w-2/3 rounded bg-gray-200" />
                    <div className="h-4 w-1/2 rounded bg-gray-200" />
                </div>
            </div>
        </section>
    );
}
