import HeaderAuth from "@/components/HeaderAuth";
import { benchMarkUserType, BenchmarkMovement } from "@/types";
import { useForm } from "@inertiajs/react";
import { FormEvent } from "react";

export default function ProfileMarks({ markUser }: { markUser: benchMarkUserType }) {
    const { data, setData, post, processing, errors } = useForm<benchMarkUserType>({
        email: markUser.email,
        fullname: markUser.fullname || "",
        avatarUrl: null,
        benchmarkMovements: markUser.benchmarkMovements || [],
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post('profile-edit');
    }

    // Obtener el primer movimiento o crear uno vacío si no existe
    const currentMovement = data.benchmarkMovements[0] || {
        front_squat: null,
        overhead_squat: null,
        shoulder_press: null,
        push_press: null,
        push_jerk: null,
        deadlift: null,
        sumo_high_pull: null,
        power_clean: null,
        power_snatch: null,
        clean_and_jerk: null,
        snatch: null,
    } as BenchmarkMovement;

    const handleMovementChange = (field: keyof BenchmarkMovement, value: number | null) => {
        const updatedMovement = {
            ...currentMovement,
            [field]: value
        };

        // Si no hay movimientos, creamos uno nuevo
        if (data.benchmarkMovements.length === 0) {
            setData("benchmarkMovements", [updatedMovement]);
        } else {
            // Actualizamos el primer movimiento
            const updatedMovements = [...data.benchmarkMovements];
            updatedMovements[0] = updatedMovement;
            setData("benchmarkMovements", updatedMovements);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <HeaderAuth
                user={markUser.fullname}
                avatarUrl={markUser.avatarUrl ? `/storage/${markUser.avatarUrl}` : undefined}
            />

            <div className="flex flex-1 items-center justify-center px-4 py-12">
                <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">Mis benchmarks</h1>
                        <p className="text-sm text-gray-500">Actualiza tus RM</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                        <div>
                            <label
                                htmlFor="frontSquat"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Front Squat
                            </label>
                            <div className="relative mt-1">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    </svg>
                                </div>
                                <input
                                    type="number"
                                    name="frontSquat"
                                    id="frontSquat"
                                    value={currentMovement.front_squat ?? ""}
                                    onChange={(e) =>
                                        handleMovementChange(
                                            "front_squat",
                                            e.target.value === "" ? null : Number(e.target.value)
                                        )
                                    }
                                    className="block w-full pl-10 rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
                                />
                            </div>
                        </div>

                        {/* Puedes agregar más inputs para otros movimientos */}
                        <div>
                            <label
                                htmlFor="deadlift"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Deadlift
                            </label>
                            <input
                                type="number"
                                name="deadlift"
                                id="deadlift"
                                value={currentMovement.deadlift ?? ""}
                                onChange={(e) =>
                                    handleMovementChange(
                                        "deadlift",
                                        e.target.value === "" ? null : Number(e.target.value)
                                    )
                                }
                                className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                        >
                            {processing ? "Guardando..." : "Guardar cambios"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}