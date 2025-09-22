import HeaderAuth from "@/components/HeaderAuth";
import { benchMarkUserType, BenchmarkMovement } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import { FormEvent, useEffect, useState } from "react";
import ModalPopUp from "@/components/ModalPopUp";

type FlashProps = {
  flash?: { title?: string; message?: string };
  errors?: Record<string, string>;
};


export default function ProfileMarks({ markUser }: { markUser: benchMarkUserType }) {
    const { data, setData, post, processing, errors } = useForm<benchMarkUserType>({
        email: markUser.email,
        fullname: markUser.fullname || "",
        avatarUrl: null,
        benchmarkMovements: markUser.benchmarkMovements || [],
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post('update-bench-movements');
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

        if (data.benchmarkMovements.length === 0) {
            setData("benchmarkMovements", [updatedMovement]);
        } else {

            const updatedMovements = [...data.benchmarkMovements];
            updatedMovements[0] = updatedMovement;
            setData("benchmarkMovements", updatedMovements);
        }
    };

    
      const { props } = usePage<FlashProps>();
    
      const [modalType, setModalType] = useState<"success" | "error" | null>(null);
      const [modalTitle, setModalTitle] = useState("");
      const [modalMessage, setModalMessage] = useState("");
      const [modalShow, setModalShow] = useState(false);
    
      useEffect(() => {
        // Caso éxito
        if (props.flash?.message) {
          setModalType("success");
          setModalTitle(props.flash.title || "Éxito");
          setModalMessage(props.flash.message || "RM's Actualizados");
          setModalShow(true);
        }
    
        // Caso error
        if (props.errors && Object.keys(props.errors).length > 0) {
          setModalType("error");
          setModalTitle("Error al actualizar tus RM's");
          setModalMessage(Object.values(props.errors).join("\n"));
          setModalShow(true);
        }
      }, [props.flash, props.errors]);



    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <HeaderAuth
                user={markUser.fullname}
                avatarUrl={markUser.avatarUrl ? `/storage/${markUser.avatarUrl}` : undefined}
            />

            <div className="flex flex-1 items-center justify-center px-4 py-12">
                <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Mis Benchmarks</h1>
                        <p className="text-sm text-gray-500 mt-1">Actualiza tus RM</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Inputs en grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Front Squat */}
                            <div>
                                <label
                                    htmlFor="frontSquat"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Front Squat
                                </label>
                                <div className="relative">
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
                                        className="w-full rounded-lg border border-gray-300 bg-gray-50 pr-12 pl-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                                        lbs
                                    </span>
                                </div>
                            </div>

                            {/* Overhead Squat */}
                            <div>
                                <label
                                    htmlFor="overhead_squat"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Overhead Squat
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        name="overhead_squat"
                                        id="overhead_squat"
                                        value={currentMovement.overhead_squat ?? ""}
                                        onChange={(e) =>
                                            handleMovementChange(
                                                "overhead_squat",
                                                e.target.value === "" ? null : Number(e.target.value)
                                            )
                                        }
                                        className="w-full rounded-lg border border-gray-300 bg-gray-50 pr-12 pl-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                                        lbs
                                    </span>
                                </div>
                            </div>

                            {/* shoulder_press */}
                            <div>
                                <label
                                    htmlFor="shoulder_press"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Shoulder Press
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        name="shoulder_press"
                                        id="shoulder_press"
                                        value={currentMovement.shoulder_press ?? ""}
                                        onChange={(e) =>
                                            handleMovementChange(
                                                "shoulder_press",
                                                e.target.value === "" ? null : Number(e.target.value)
                                            )
                                        }
                                        className="w-full rounded-lg border border-gray-300 bg-gray-50 pr-12 pl-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                                        lbs
                                    </span>
                                </div>
                            </div>
                            {/* Push Press */}
                            <div>
                                <label
                                    htmlFor="push_press"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Push Press
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        name="push_press"
                                        id="push_press"
                                        value={currentMovement.push_press ?? ""}
                                        onChange={(e) =>
                                            handleMovementChange(
                                                "push_press",
                                                e.target.value === "" ? null : Number(e.target.value)
                                            )
                                        }
                                        className="w-full rounded-lg border border-gray-300 bg-gray-50 pr-12 pl-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                                        lbs
                                    </span>
                                </div>
                            </div>
                            {/* push_jerk */}
                            <div>
                                <label
                                    htmlFor="push_jerk"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Push Jerk
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        name="push_jerk"
                                        id="push_jerk"
                                        value={currentMovement.push_jerk ?? ""}
                                        onChange={(e) =>
                                            handleMovementChange(
                                                "push_jerk",
                                                e.target.value === "" ? null : Number(e.target.value)
                                            )
                                        }
                                        className="w-full rounded-lg border border-gray-300 bg-gray-50 pr-12 pl-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                                        lbs
                                    </span>
                                </div>
                            </div>
                            {/* deadlift */}
                            <div>
                                <label
                                    htmlFor="deadlift"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    DeadLift 
                                </label>
                                <div className="relative">
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
                                        className="w-full rounded-lg border border-gray-300 bg-gray-50 pr-12 pl-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                                        lbs
                                    </span>
                                </div>
                            </div>
                            {/* sumo_high_pull */}
                            <div>
                                <label
                                    htmlFor="sumo_high_pull"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Sumo High Pull
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        name="sumo_high_pull"
                                        id="sumo_high_pull"
                                        value={currentMovement.sumo_high_pull ?? ""}
                                        onChange={(e) =>
                                            handleMovementChange(
                                                "sumo_high_pull",
                                                e.target.value === "" ? null : Number(e.target.value)
                                            )
                                        }
                                        className="w-full rounded-lg border border-gray-300 bg-gray-50 pr-12 pl-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                                        lbs
                                    </span>
                                </div>
                            </div>
                            {/* power_clean */}
                            <div>
                                <label
                                    htmlFor="power_clean"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Power Clean
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        name="power_clean"
                                        id="power_clean"
                                        value={currentMovement.power_clean ?? ""}
                                        onChange={(e) =>
                                            handleMovementChange(
                                                "power_clean",
                                                e.target.value === "" ? null : Number(e.target.value)
                                            )
                                        }
                                        className="w-full rounded-lg border border-gray-300 bg-gray-50 pr-12 pl-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                                        lbs
                                    </span>
                                </div>
                            </div>
                            {/* power_snatch */}
                            <div>
                                <label
                                    htmlFor="power_snatch"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Power Snatch
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        name="power_snatch"
                                        id="power_snatch"
                                        value={currentMovement.power_snatch ?? ""}
                                        onChange={(e) =>
                                            handleMovementChange(
                                                "power_snatch",
                                                e.target.value === "" ? null : Number(e.target.value)
                                            )
                                        }
                                        className="w-full rounded-lg border border-gray-300 bg-gray-50 pr-12 pl-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                                        lbs
                                    </span>
                                </div>
                            </div>
                            {/* clean_and_jerk */}
                            <div>
                                <label
                                    htmlFor="clean_and_jerk"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Clean and Jerk
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        name="clean_and_jerk"
                                        id="clean_and_jerk"
                                        value={currentMovement.clean_and_jerk ?? ""}
                                        onChange={(e) =>
                                            handleMovementChange(
                                                "clean_and_jerk",
                                                e.target.value === "" ? null : Number(e.target.value)
                                            )
                                        }
                                        className="w-full rounded-lg border border-gray-300 bg-gray-50 pr-12 pl-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                                        lbs
                                    </span>
                                </div>
                            </div>
                            {/* snatch */}
                            <div>
                                <label
                                    htmlFor="snatch"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Snatch
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        name="snatch"
                                        id="snatch"
                                        value={currentMovement.snatch ?? ""}
                                        onChange={(e) =>
                                            handleMovementChange(
                                                "snatch",
                                                e.target.value === "" ? null : Number(e.target.value)
                                            )
                                        }
                                        className="w-full rounded-lg border border-gray-300 bg-gray-50 pr-12 pl-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                                        lbs
                                    </span>
                                </div>
                            </div>


                        </div>

                        {/* Botón */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 transition-all duration-200"
                        >
                            {processing ? "Guardando..." : "Guardar cambios"}
                        </button>
                    </form>
                </div>
            </div>

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