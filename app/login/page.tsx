
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
    return (
        <main className="flex min-h-screen items-center justify-center px-4">
            <div className="w-full max-w-sm">
                <h1 className="mb-6 text-center text-3xl font-bold text-gray-900">
                    Sign In
                </h1>

                <LoginForm />
            </div>
        </main>
    );
}
