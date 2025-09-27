import HeaderAuth from "@/components/HeaderAuth";
import BackButton from "@/components/BackButton";
import ModalPopUp from "@/components/ModalPopUp";
import { wodsMarkUserType, wodsUserType } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import { PlusCircleIcon, PencilIcon, TrashIcon, ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import { FormEvent } from "react";
import { FlashPropsType } from "@/types";
import { useState, useEffect } from "react";

export default function profileWods({ wodlist }: { wodlist: wodsMarkUserType }) {
    // useForm para añadir un nuevo wod
    const { data, setData, post, processing, errors } = useForm<Omit<wodsUserType, "id" | "created_at" | "updated_at" | "wod_user_id">>({
        wod_name: "",
        wod_protocol: "",
        wod_description: "",
        wod_score: "",
        wod_time: null,
        wod_date: null,
    });

    const [editingWod, setEditingWod] = useState<number | null>(null);
    const { delete: destroy } = useForm();

    // 🔹 Formulario para editar - CORREGIDO
    const { data: editData, setData: setEditData, put, processing: editProcessing, errors: editErrors } = useForm<{
        wod_name: string;
        wod_protocol: string | null;
        wod_description: string | null;
        wod_score: string | null;
        wod_time: string | null;
        wod_date: string | null;
    }>({
        wod_name: "",
        wod_protocol: null,
        wod_description: null,
        wod_score: null,
        wod_time: null,
        wod_date: null,
    });

    // 🔹 Función para iniciar edición - CORREGIDA
    const startEdit = (wod: wodsUserType) => {
        setEditingWod(wod.id);
        setEditData("wod_name", wod.wod_name);
        setEditData("wod_protocol", wod.wod_protocol);
        setEditData("wod_description", wod.wod_description);
        setEditData("wod_score", wod.wod_score);
        setEditData("wod_time", wod.wod_time);
        setEditData("wod_date", wod.wod_date);
    };

    // 🔹 Función para cancelar edición - CORREGIDA
    const cancelEdit = () => {
        setEditingWod(null);
        setEditData("wod_name", "");
        setEditData("wod_protocol", null);
        setEditData("wod_description", null);
        setEditData("wod_score", null);
        setEditData("wod_time", null);
        setEditData("wod_date", null);
    };

    // 🔹 Función para guardar edición - CORREGIDA (agregar data)
    // 🔹 Función para guardar edición - CORREGIDA
    const handleEditSubmit = (e: FormEvent, wodId: number) => {
        e.preventDefault();
        put(`/wods-update/${wodId}`, {
            onSuccess: () => {
                setEditingWod(null);
                setModalType("success");
                setModalTitle("WOD actualizado");
                setModalMessage("El WOD ha sido actualizado correctamente");
                setModalShow(true);
            },
            onError: (errors) => {
                setModalType("error");
                setModalTitle("Error");
                setModalMessage("No se pudo actualizar el WOD");
                setModalShow(true);
            }
        });
    };

    const [deleteWodId, setDeleteWodId] = useState<number | null>(null);
    const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
    const confirmDelete = (wodId: number) => {
        setDeleteWodId(wodId);
        setConfirmDeleteModal(true); // abre el modal
    };

    const handleDeleteConfirmed = () => {
        if (deleteWodId === null) return;

        destroy(`/wods-delete/${deleteWodId}`, {
            onSuccess: () => {
                setModalType("success");
                setModalTitle("WOD eliminado");
                setModalMessage("El WOD ha sido eliminado correctamente");
                setModalShow(true);
                setConfirmDeleteModal(false);
                setDeleteWodId(null);
            },
            onError: () => {
                setModalType("error");
                setModalTitle("Error");
                setModalMessage("No se pudo eliminar el WOD");
                setModalShow(true);
                setConfirmDeleteModal(false);
                setDeleteWodId(null);
            },
        });
    };

    const handleDelete = (wodId: number) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar este WOD?")) {
            destroy(`/wods-delete/${wodId}`, {
                onSuccess: () => {
                    // Opcional: mostrar mensaje de éxito
                    setModalType("success");
                    setModalTitle("WOD eliminado");
                    setModalMessage("El WOD ha sido eliminado correctamente");
                    setModalShow(true);
                },
                onError: (errors) => {
                    setModalType("error");
                    setModalTitle("Error");
                    setModalMessage("No se pudo eliminar el WOD");
                    setModalShow(true);
                }
            });
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post("wods-store", {
            onSuccess: () => {

                setData({
                    wod_name: "",
                    wod_protocol: "",
                    wod_description: "",
                    wod_score: "",
                    wod_time: null,
                    wod_date: null,
                });
            },
        });
    }

    const { props } = usePage<FlashPropsType>();

    const [modalType, setModalType] = useState<"success" | "error" | null>(null);
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {

        if (props.flash?.message) {
            setModalType("success");
            setModalTitle(props.flash.title || "Éxito");
            setModalMessage(props.flash.message || "Operación exitosa");
            setModalShow(true);
        }

        if (props.errors && Object.keys(props.errors).length > 0) {
            setModalType("error");
            setModalTitle("Errores de validación");
            setModalMessage(Object.values(props.errors).join("\n"));
            setModalShow(true);
        }
    }, [props.flash, props.errors]);


    return (
        <div className="min-h-screen flex flex-col">
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

                    {/* 🔹 Formulario para crear un nuevo WOD */}
                    <div className="border-b pb-6">
                        <details className="group">
                            <summary className="flex cursor-pointer items-center justify-between text-lg font-semibold text-gray-900 list-none">
                                <span className="flex items-center gap-2">
                                    <PlusCircleIcon className="h-6 w-6 text-green-600" />
                                    Agregar WOD
                                </span>
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

                            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                                {/* Datos principales */}
                                <div className="space-y-4">
                                    <h2 className="text-lg font-semibold text-gray-800">Detalles del WOD</h2>

                                    <div>
                                        <label htmlFor="wodName" className="block text-sm font-medium text-gray-700">
                                            Nombre del WOD
                                        </label>
                                        <input
                                            id="wodName"
                                            type="text"
                                            placeholder="Ex. Lumberjack"
                                            value={data.wod_name}
                                            onChange={(e) => setData("wod_name", e.target.value)}
                                            className="mt-1 block w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="wodProtocol" className="block text-sm font-medium text-gray-700">
                                            Protocolo
                                        </label>
                                        <input
                                            id="wodProtocol"
                                            type="text"
                                            placeholder="Ex. AMRAP, EMOM, FOR TIME"
                                            value={data.wod_protocol ?? ""}
                                            onChange={(e) => setData("wod_protocol", e.target.value)}
                                            className="mt-1 block w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="wodDescription" className="block text-sm font-medium text-gray-700">
                                            Descripción
                                        </label>
                                        <textarea
                                            id="wodDescription"
                                            rows={3}
                                            placeholder="Ej. 5 rondas de 400m run + 20 thrusters..."
                                            value={data.wod_description ?? ""}
                                            onChange={(e) => setData("wod_description", e.target.value)}
                                            className="mt-1 block w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                {/* Score & Fecha */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="wodScore" className="block text-sm font-medium text-gray-700">
                                            Score o Tiempo
                                        </label>
                                        <input
                                            id="wodScore"
                                            type="text"
                                            placeholder="Ej. 20 rounds / 12:34"
                                            value={data.wod_score ?? ""}
                                            onChange={(e) => setData("wod_score", e.target.value)}
                                            className="mt-1 block w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="wodDate" className="block text-sm font-medium text-gray-700">
                                            Fecha
                                        </label>
                                        <input
                                            id="wodDate"
                                            type="date"
                                            value={data.wod_date ?? ""}
                                            onChange={(e) => setData("wod_date", e.target.value)}
                                            className="mt-1 block w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                {/* Botón fijo al final */}
                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                                    >
                                        Guardar WOD
                                    </button>
                                </div>
                            </form>

                        </details>
                    </div>

                    {/* 🔹 Lista de WODs existentes */}
                    <div className="border-b pb-6 mt-6">
                        <details className="group">
                            <summary className="flex cursor-pointer items-center justify-between text-lg font-semibold text-gray-900 list-none">
                                <span className="flex items-center gap-2">

                                    <ClipboardDocumentListIcon className="h-6 w-6 text-blue-600" />
                                    Ver WOD's
                                </span>
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

                            <div className="mt-6">
                                <h2 className="text-xl font-semibold text-gray-900">Tus WODs</h2>
                                <ul className="mt-4 space-y-2">
                                    {wodlist.wods.map((wod) => (
                                        <div
                                            key={wod.id}
                                            className="p-4 border rounded-xl shadow-sm bg-white mb-3 hover:shadow-md transition"
                                        >
                                            {editingWod === wod.id ? (
                                                // 🔹 MODO EDICIÓN
                                                <form onSubmit={(e) => handleEditSubmit(e, wod.id)} className="space-y-3">
                                                    <input
                                                        value={editData.wod_name}
                                                        onChange={(e) => setEditData("wod_name", e.target.value)}
                                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
                                                        placeholder="Nombre del WOD"
                                                    />
                                                    <textarea
                                                        value={editData.wod_description ?? ""}
                                                        onChange={(e) => setEditData("wod_description", e.target.value)}
                                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
                                                        placeholder="Descripción del WOD"
                                                        rows={3}
                                                    />
                                                    <input
                                                        value={editData.wod_protocol ?? ""}
                                                        onChange={(e) => setEditData("wod_protocol", e.target.value)}
                                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
                                                        placeholder="Protocolo (Ex. AMRAP, EMOM, FOR TIME)"
                                                    />
                                                    <input
                                                        value={editData.wod_score ?? ""}
                                                        onChange={(e) => setEditData("wod_score", e.target.value)}
                                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
                                                        placeholder="Score o tiempo (Ex. 20 rounds / 12:34)"
                                                    />
                                                    <input
                                                        type="date"
                                                        value={
                                                            editData.wod_date
                                                                ? new Date(editData.wod_date).toISOString().split("T")[0]
                                                                : ""
                                                        }
                                                        onChange={(e) => setEditData("wod_date", e.target.value)}
                                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
                                                    />


                                                    <div className="flex flex-wrap gap-2 mt-2">
                                                        <button
                                                            type="submit"
                                                            disabled={editProcessing}
                                                            className="flex-1 bg-blue-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                                                        >
                                                            Guardar
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={cancelEdit}
                                                            className="flex-1 bg-gray-300 text-black font-medium px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                                                        >
                                                            Cancelar
                                                        </button>
                                                    </div>
                                                </form>
                                            ) : (
                                                // 🔹 MODO VISUALIZACIÓN
                                                <>
                                                    <p className="font-bold text-lg text-black">{wod.wod_name}</p>
                                                    <p className="text-sm text-gray-600">{wod.wod_description}</p>
                                                    <p className="text-sm text-gray-600">
                                                        <span className="font-bold text-black">Protocolo:</span> {wod.wod_protocol}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        <span className="font-bold text-black">Score/Time:</span> {wod.wod_score}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        <span className="font-bold text-black">Fecha:</span> {wod.wod_date}
                                                    </p>


                                                    <div className="flex gap-3 mt-3">
                                                        {/* Icono Editar */}
                                                        <button
                                                            onClick={() => startEdit(wod)}
                                                            className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                                                            title="Editar"
                                                        >
                                                            <PencilIcon className="h-5 w-5" />
                                                        </button>

                                                        {/* Icono Eliminar */}
                                                        <button
                                                            onClick={() => confirmDelete(wod.id)}
                                                            className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                                                            title="Eliminar"
                                                        >
                                                            <TrashIcon className="h-5 w-5" />
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    ))}

                                </ul>
                            </div>
                        </details>
                    </div>
                </div>
            </div>
            {confirmDeleteModal && (
                <ModalPopUp
                    modalType="error"
                    modalTitle="Confirmar eliminación"
                    modalMessage="¿Estás seguro de que quieres eliminar este WOD?"
                    modalShow={confirmDeleteModal}
                    onClose={() => setConfirmDeleteModal(false)}
                    onConfirm={handleDeleteConfirmed}  // botón "Sí" dispara la eliminación
                    confirmText="Sí, eliminar"
                />
            )}
            {/* Modal de éxito */}
            {modalShow && (
                <ModalPopUp
                    modalType={modalType || "success"}
                    modalTitle={modalTitle}
                    modalMessage={modalMessage}
                    modalShow={modalShow}
                    onClose={() => setModalShow(false)}
                />
            )}
        </div>
    );
}
