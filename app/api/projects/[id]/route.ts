import { NextRequest, NextResponse } from "next/server";
import { getProjectById } from "@/lib/projects-db";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const projectId = Number(id);

    if (isNaN(projectId)) {
        return NextResponse.json(
            { error: "Invalid project ID" },
            { status: 400 }
        );
    }

    const project = await getProjectById(projectId);

    if (!project) {
        return NextResponse.json(
            { error: "Project not found" },
            { status: 404 }
        );
    }

    return NextResponse.json(project);
}
