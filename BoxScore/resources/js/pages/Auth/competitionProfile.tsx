import ModalPopUp from "@/components/ModalPopUp";
import BackButton from "@/components/BackButton";
import HeaderAuth from "@/components/HeaderAuth";
import CategorySelector from "@/components/CategorySelector";
import { CompetitionRegisterDataType } from "@/types";



import { profileUserType, FlashPropsType } from "@/types";
import { FormEvent, useState } from "react";
import { useForm } from "@inertiajs/react";

export default function CompetitionProfile({ competitionData }: { competitionData: CompetitionRegisterDataType }) {

    const { data, setData, post, processing, errors } = useForm<CompetitionRegisterDataType>({
        email: competitionData.email,
        fullname: competitionData.fullname || "",
        avatarUrl: null,
        categories: competitionData.categories || []
    });

    const [preview, setPreview] = useState<string | null>(null);


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const file = e.target.files?.[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };


    return (
        <div className="min-h-screen flex flex-col">
            <HeaderAuth
                user={competitionData.fullname}
                avatarUrl={competitionData.avatarUrl ? `/storage/${competitionData.avatarUrl}` : undefined}
            />
            <BackButton />
            <div className="flex flex-1 items-center justify-center px-4 py-12">
                <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">Registra tu competencia</h1>
                        <p className="text-sm text-gray-500 mt-2">Ingresa los datos de tu competencia</p>
                    </div>

                    <form  >

                        <div className="mb-6">
                            <label
                                htmlFor="compName"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Nombre de competencia *
                            </label>
                            <input
                                id="compName"
                                type="text"


                                placeholder="Ej. Box Score Challenge, Torneo Nacional..."
                                className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition" /* Aumenté el padding */
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                htmlFor="compAddress"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Dirección completa *
                            </label>
                            <input
                                id="compAddress"
                                type="text"
                                placeholder="Ej. Calle 123, Colonia, Ciudad, México"
                                className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label
                                htmlFor="compMapLink"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Link de Google Maps (opcional)
                            </label>
                            <input
                                id="compMapLink"
                                type="url"
                                placeholder="Ej. https://goo.gl/maps/xxxx"
                                className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
                            />
                        </div>


                        <div className="mb-6">
                            <label
                                htmlFor="compNameBox"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Nombre del Box
                            </label>
                            <input
                                id="compNameBox"
                                type="text"
                                placeholder="Ej. Box Score"
                                className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
                            />
                        </div>

                        {/* {Agregar foto} */}
                        <div className="flex flex-col items-center space-y-3">
                            <img
                                src={preview ? preview : "/img/ProfileDefault.png"}
                                alt="Preview"
                                className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full object-cover border-6 border-green-500"
                            />

                            <label
                                htmlFor="profileImage"
                                className="cursor-pointer bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
                            >
                                Agregar foto
                            </label>
                            <input
                                id="profileImage"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </div>

                        <div className="mb-6">
                            <label
                                htmlFor="compDescripcion"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Descripción de la competencia
                            </label>
                            <input
                                id="compDescripcion"
                                type="text"
                                placeholder="Ej. 3 Eventos en un dia"
                                className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
                            />
                        </div>
                
                        <CategorySelector
                            categories={competitionData.categories}
                        />
                        


                        {/* Botón de enviar */}
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-blue-500 px-6 py-3 text-white font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
                        >
                            Crear Competencia
                        </button>
                    </form>


                </div>
            </div>
        </div>
    )
}


