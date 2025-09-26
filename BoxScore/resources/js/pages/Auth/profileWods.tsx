import HeaderAuth from "@/components/HeaderAuth";
import BackButton from "@/components/BackButton";
import { wodsMarkUserType } from "@/types";
import { useForm } from "@inertiajs/react";
import { User, Lock, Dumbbell } from "lucide-react";

export default function profileWods({ wodlist }: { wodlist: wodsMarkUserType }) {

    const { data, setData, post, processing, errors } = useForm<wodsMarkUserType>({
        email: wodlist.email,
        fullname: wodlist.fullname || "",
        avatarUrl: null,
        wods: wodlist.wods || [],
    });
    console.log(wodlist)



    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <HeaderAuth
                user={wodlist.fullname}
                avatarUrl={wodlist.avatarUrl ? `/storage/${wodlist.avatarUrl}` : undefined}
            />

            <BackButton />
            <div className="flex flex-1 items-center justify-center px-4 py-12">
                <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">WOD</h1>
                        <p className="text-sm text-gray-500 mt-1">Agregar WOD</p>
                    </div>

                    <div className="border-b pb-4">
                        <details className="group">
                            <summary className="flex cursor-pointer items-center justify-between text-lg font-semibold text-gray-900 list-none">
                                <span className="flex items-center gap-2">
                                    <User className="h-5 w-5 text-blue-600" />
                                    Agregar WOD
                                </span>

                                {/* Icono desplegable */}
                                <svg
                                    className="ml-2 h-5 w-5 text-gray-500 transition-transform group-open:rotate-180"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </summary>

                            <form action="">
                                {/* Nombre */}
                                <div>
                                    <label
                                        htmlFor="wodName"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Nombre del WOD
                                    </label>
                                    <input
                                        id="wodName"
                                        type="text"
                                        placeholder="Ex. Lumberjack"
                                        value={data.wods[0].wod_name}
                                        onChange={(e) =>
                                            setData("wods", [
                                            { ...data.wods[0], wod_name: e.target.value }, // actualiza solo el primer WOD
                                            ...data.wods.slice(1), // conserva el resto
                                            ])
                                        }
                                        className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
                                    />
                                </div>
                            </form>
                        </details>


                    </div>
                </div>



            </div>
        </div>
    )
}