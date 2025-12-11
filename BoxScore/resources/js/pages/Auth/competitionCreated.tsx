import HeaderAuth from "@/components/HeaderAuth";
import BackButton from "@/components/BackButton";
import { CompetitionCreatedType } from "@/types";
import { useForm } from "@inertiajs/react";

export default function CompetitionCreated({ competition_data }: { competition_data: CompetitionCreatedType }) {

    const { data } = useForm<CompetitionCreatedType>({
        email: competition_data.email,
        fullname: competition_data.fullname || "",
        avatarUrl: competition_data.avatarUrl,
        competitions: competition_data.competitions || []
    });

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">

            {/* Header */}
            <HeaderAuth
                user={competition_data.fullname}
                avatarUrl={competition_data.avatarUrl ? `/storage/${competition_data.avatarUrl}` : undefined}
            />

            <BackButton />
            <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                    Próximas Competencias
                </h1>
                <p className="text-lg text-gray-500 mt-3 font-medium">
                    3, 2, 1 ¡Go!
                </p>
            </div>

            <div className="flex flex-1 justify-center px-4 py-12">
                
                <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                    {data.competitions.map(comp => {

        
                        const now = new Date();
                        const attendanceDate = new Date(comp.competition_attendance_date);

                        const isAvailable = attendanceDate >= now;

                        const diffTime = attendanceDate.getTime() - now.getTime();
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                        return (
                            <div
                                key={comp.id}
                                className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                            >

                                {/* Imagen */}
                                {comp.competition_img && (
                                    <div className="relative">
                                        <img
                                            src={`/storage/${comp.competition_img}`}
                                            alt={comp.competition_name}
                                            className="w-full h-48 object-cover"
                                        />

                                        {/* Tag + Icon + Tooltip */}
                                        <div className="absolute top-3 left-3 group">
                                            <span
                                                className={`flex items-center gap-1 text-white text-xs px-3 py-1 rounded-full shadow-md
                                                    ${isAvailable ? "bg-green-600" : "bg-red-600"}
                                                `}
                                            >
                                                {isAvailable ? (
                                                    // Check
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                        viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
                                                        className="w-3 h-3"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                            d="M5 13l4 4L19 7" />
                                                    </svg>
                                                ) : (
                                                    // X
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                        viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
                                                        className="w-3 h-3"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                            d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                )}

                                                {isAvailable ? "Disponible" : "Sin disponibilidad"}
                                            </span>

                                            {/* Tooltip */}
                                            <div className="absolute left-0 mt-1 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
                                                {isAvailable
                                                    ? `Faltan ${diffDays} días para cerrar inscripciones`
                                                    : "La fecha de inscripción ya pasó"
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Contenido */}
                                <div className="p-5 flex flex-col gap-2">
                                    <h2 className="text-xl font-bold text-gray-800">
                                        {comp.competition_name}
                                    </h2>

                                    <p className="text-sm text-gray-600">🏋️ Powered By {comp.competition_box_name}</p>
                                    <p className="text-sm text-gray-600">📌 {comp.competition_place}</p>

                                    <p className="text-sm text-gray-700 mt-2">
                                        <span className="font-semibold">Inicio:</span>{" "}
                                        {new Date(comp.competition_start_date).toLocaleDateString()}
                                    </p>

                                    {comp.competition_finish_date && (
                                        <p className="text-sm text-gray-700">
                                            <span className="font-semibold">Fin:</span>{" "}
                                            {new Date(comp.competition_finish_date).toLocaleDateString()}
                                        </p>
                                    )}

                                    {/* Countdown visible */}
                                    {isAvailable && (
                                        <p className="text-xs text-green-600 font-semibold mt-1">
                                            ⏳ Faltan {diffDays} días para cerrar inscripciones
                                        </p>
                                    )}

                                    {!isAvailable && (
                                        <p className="text-xs text-red-600 font-semibold mt-1">
                                            ❌ Inscripciones cerradas
                                        </p>
                                    )}
                                </div>

                                {/* Botones */}
                                <div className="px-5 pb-5 mt-auto">
                                    <div className="flex flex-row justify-between gap-3">

                                        {/* Inscribirse */}
                                        <a
                                            href={isAvailable ? `/competitions/${comp.id}/register` : undefined}
                                            className={`flex items-center gap-2 px-3 py-2 
                                                text-sm rounded-lg shadow-sm transition
                                                ${isAvailable
                                                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                }
                                            `}
                                            onClick={(e) => !isAvailable && e.preventDefault()}
                                        >
                                            {/* Icono de registro */}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="2"
                                                stroke="currentColor"
                                                className="w-4 h-4"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M9 2h6m-3 0v4m-4 4h8m-8 4h8m-8 4h5m6-10v10a2 2 0 01-2 2H7a2 2 0 01-2-2V8a2 2 0 012-2h3m4 0h3a2 2 0 012 2z"
                                                />
                                            </svg>
                                            Inscribirse
                                        </a>

                                        {/* WODs */}
                                        <a
                                            href={`/competitions/${comp.id}/wods`}
                                            className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 text-sm rounded-lg shadow-sm transition"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                className="w-4 h-4"
                                            >
                                                <path d="M3 12h2m2 0h10m2 0h2" />
                                                <path d="M7 9v6M17 9v6" />
                                                <rect x="1" y="10" width="2" height="4" />
                                                <rect x="21" y="10" width="2" height="4" />
                                            </svg>
                                            WOD's
                                        </a>

                                        {/* Heats */}
                                        <a
                                            href={`/competitions/${comp.id}/heats`}
                                            className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 text-sm rounded-lg shadow-sm transition"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                className="w-4 h-4"
                                            >
                                                <circle cx="12" cy="14" r="8" />
                                                <path d="M12 10v4l2 2" />
                                                <path d="M9 2h6" />
                                                <path d="M12 2v4" />
                                            </svg>
                                            Heats
                                        </a>

                                    </div>
                                </div>

                            </div>
                        );
                    })}

                    {data.competitions.length === 0 && (
                        <p className="text-gray-500 col-span-full text-center">
                            No tienes competencias creadas.
                        </p>
                    )}
                </div>
            </div>

        </div>
    );
}
