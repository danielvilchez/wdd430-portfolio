import { sql } from "@vercel/postgres";

export interface User {
    id: number;
    email: string;
    password_hash: string;
}

export async function getUserByEmail(
    email: string
): Promise<User | null> {
    const { rows } = await sql<User>`
        SELECT id, email, password_hash
        FROM users
        WHERE email = ${email}
        LIMIT 1
    `;

    return rows[0] ?? null;
}
