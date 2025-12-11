import { useForm } from "@inertiajs/react";
import { FormEvent } from "react";
import HeaderAuth from "@/components/HeaderAuth";

type HeaderProps = {
  user: string;
  avatarUrl?: string; 
};

export default function DashboardPage({ user, avatarUrl }: HeaderProps) {

    const { post } = useForm({});
    

    const handleSubmit = (e: FormEvent) => {
            e.preventDefault();
            post('/logout');
        }

    return (
        <div className="min-h-screen flex flex-col">
        {/* Header arriba */}
        <HeaderAuth user={user} avatarUrl={avatarUrl} />

        {/* Contenido */}
        <main className="flex-1 p-6">
            <p className="text-lg">Hola, {user}</p>
            <h1 className="text-2xl font-bold mt-4">Dashboard</h1>

            <a href="/competitions-created">Ver competencias</a>

            <form onSubmit={handleSubmit} className="mt-6">
                <button
                    type="submit"
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                    Cerrar Sesión
                </button>
            </form>
        </main>
        </div>
    );
}
