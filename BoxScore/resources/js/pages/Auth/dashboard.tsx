import { useForm } from "@inertiajs/react";
import { FormEvent } from "react";


export default function DashboardPage({ email }: { email: string }) {

    const { post } = useForm({});
    

    const handleSubmit = (e: FormEvent) => {
            e.preventDefault();
            post('/logout');
        }

    return (
        <div className="p-6">
            <p className="text-lg">Hola, {email}</p>
            <h1 className="text-2xl font-bold mt-4">Dashboard</h1>

            <form onSubmit={handleSubmit} className="mt-6">
                <button
                    type="submit"
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                    Cerrar Sesión
                </button>
            </form>
        </div>
    );
}
