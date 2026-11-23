import nextEnv from "@next/env";
import bcrypt from "bcryptjs";

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());

const { sql } = await import("@vercel/postgres");

function ask(question, hidden = false) {
    return new Promise((resolve) => {
        const stdin = process.stdin;
        let value = "";

        if (!stdin.isTTY) {
            throw new Error("Run this script in an interactive terminal.");
        }

        process.stdout.write(question);
        stdin.setEncoding("utf8");
        stdin.setRawMode(true);
        stdin.resume();

        function onData(char) {
            if (char === "\u0003") {
                process.exit();
            }

            if (char === "\r" || char === "\n") {
                stdin.setRawMode(false);
                stdin.pause();
                stdin.removeListener("data", onData);
                process.stdout.write("\n");
                resolve(value);
                return;
            }

            if (char === "\u007f" || char === "\b") {
                if (value.length > 0) {
                    value = value.slice(0, -1);
                    process.stdout.write("\b \b");
                }
                return;
            }

            value += char;
            process.stdout.write(hidden ? "*" : char);
        }

        stdin.on("data", onData);
    });
}

try {
    const email = (await ask("Owner email: "))
        .trim()
        .toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error("Please enter a valid email address.");
    }

    const password = await ask("Owner password (minimum 6 characters): ", true);

    if (password.length < 6) {
        throw new Error("Password must have at least 6 characters.");
    }

    const password_hash = await bcrypt.hash(password, 10);

    await sql`
        INSERT INTO users (email, password_hash)
        VALUES (${email}, ${password_hash})
        ON CONFLICT (email)
        DO UPDATE SET password_hash = EXCLUDED.password_hash
    `;

    console.log("Owner account created or updated successfully.");
} catch (error) {
    console.error("Error:", error.message);
    process.exitCode = 1;
} finally {
    process.exit();
}
