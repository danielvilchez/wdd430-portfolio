"use server";

import { sql } from "@vercel/postgres";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const currentYear = new Date().getFullYear();

const CreateProjectSchema = z.object({
    title: z.string().trim().min(3, "Title must be at least 3 characters."),
    description: z.string().trim().min(20, "Description must be at least 20 characters."),
    type: z.enum(["opensource", "school"]),
    technologies: z.string().trim().min(2, "Add at least one technology."),
    link: z.string().trim(),
    yearCompleted: z.coerce
        .number()
        .int("Year must be a whole number.")
        .gte(2000, "Year must be 2000 or later.")
        .lte(currentYear, `Year cannot be greater than ${currentYear}.`),
});

const ProjectFormSchema = z.object({
    title: z.string().trim().min(2, "Title must have at least 2 characters."),
    description: z.string().trim(),
    type: z.enum(["opensource", "school"]),
    technologies: z.string().trim().min(2, "Enter at least one technology."),
    link: z.string().trim(),
});

export type State = {
    errors?: {
        title?: string[];
        description?: string[];
        technologies?: string[];
        yearCompleted?: string[];
        type?: string[];
        link?: string[];
    };
    message?: string | null;
};

function getProjectData(formData: FormData) {
    const validatedFields = ProjectFormSchema.safeParse({
        title: formData.get("title"),
        description: formData.get("description"),
        type: formData.get("type"),
        technologies: formData.get("technologies"),
        link: formData.get("link") ?? "",
    });

    if (!validatedFields.success) {
        throw new Error("Invalid project data. Please check the form fields.");
    }

    const data = validatedFields.data;

    return {
        ...data,
        technologies: data.technologies
            .split(",")
            .map((technology) => technology.trim())
            .filter(Boolean),
        link: data.link || null,
    };
}

export async function createProject(
    prevState: State,
    formData: FormData
): Promise<State> {
    const validatedFields = CreateProjectSchema.safeParse({
        title: formData.get("title"),
        description: formData.get("description"),
        type: formData.get("type"),
        technologies: formData.get("technologies"),
        link: formData.get("link") ?? "",
        yearCompleted: formData.get("yearCompleted"),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing or invalid fields. Failed to create project.",
        };
    }

    const {
        title,
        description,
        type,
        technologies,
        link,
        yearCompleted,
    } = validatedFields.data;

    const technologyList = technologies
        .split(",")
        .map((technology) => technology.trim())
        .filter(Boolean);

    try {
        await sql`
            INSERT INTO projects (
                title,
                description,
                type,
                technologies,
                link,
                year_completed
            )
            VALUES (
                ${title},
                ${description},
                ${type},
                ${`{${technologyList.join(",")}}`}::text[],
                ${link || null},
                ${yearCompleted}
            )
        `;
    } catch (error) {
        console.error("Error creating project:", error);

        return {
            message: "Database Error: Failed to create project.",
        };
    }

    revalidatePath("/projects");
    redirect("/projects");
}


export async function updateProject(id: string, formData: FormData) {
    try {
        const projectId = Number(id);

        if (!Number.isSafeInteger(projectId) || projectId <= 0) {
            throw new Error("Invalid project ID.");
        }

        const project = getProjectData(formData);

        await sql`
            UPDATE projects
            SET
                title = ${project.title},
                description = ${project.description},
                type = ${project.type},
                technologies = ${`{${project.technologies.join(",")}}`}::text[],
                link = ${project.link}
            WHERE id = ${projectId}
        `;
    } catch (error) {
        console.error("Error updating project:", error);
        throw new Error("Failed to update project. Please try again later.");
    }

    revalidatePath("/projects");
    redirect("/projects");
}

export async function deleteProject(id: string) {
    try {
        const projectId = Number(id);

        if (!Number.isSafeInteger(projectId) || projectId <= 0) {
            throw new Error("Invalid project ID.");
        }

        await sql`
            DELETE FROM projects
            WHERE id = ${projectId}
        `;
    } catch (error) {
        console.error("Error deleting project:", error);
        throw new Error("Failed to delete project. Please try again later.");
    }

    revalidatePath("/projects");
    redirect("/projects");
}

