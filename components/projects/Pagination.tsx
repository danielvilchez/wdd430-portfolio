"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function Pagination({
    totalPages,
}: {
    totalPages: number;
}) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentPage = Math.max(
        1,
        Number(searchParams.get("page")) || 1
    );

    function createPageURL(pageNumber: number) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", pageNumber.toString());

        return `${pathname}?${params.toString()}`;
    }

    if (totalPages <= 1) {
        return null;
    }

    return (
        <div className="mt-8 flex items-center justify-center gap-4">
            {currentPage > 1 ? (
                <Link
                    href={createPageURL(currentPage - 1)}
                    className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-100"
                >
                    Previous
                </Link>
            ) : (
                <span className="rounded-lg border border-gray-200 px-4 py-2 text-gray-400">
                    Previous
                </span>
            )}

            <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
            </span>

            {currentPage < totalPages ? (
                <Link
                    href={createPageURL(currentPage + 1)}
                    className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-100"
                >
                    Next
                </Link>
            ) : (
                <span className="rounded-lg border border-gray-200 px-4 py-2 text-gray-400">
                    Next
                </span>
            )}
        </div>
    );
}
