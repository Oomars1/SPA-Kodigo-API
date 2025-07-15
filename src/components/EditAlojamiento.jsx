import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { updateAccommodation } from "../services/accommodationService"; // debe ser PUT
import Swal from "sweetalert2";

export default function EditAlojamiento({ alojamiento, onClose, onUpdate }) {
    const { register, handleSubmit, reset } = useForm();

    // Rellenar el formulario al abrir el modal
    useEffect(() => {
        if (alojamiento) {
            reset(alojamiento);
        }
    }, [alojamiento, reset]);

    const onSubmit = async (data) => {
        try {
            console.log(alojamiento.id, data)
            await updateAccommodation(alojamiento.id, data); //  deberías tener esta función con axios.put
            onUpdate(alojamiento.id, data);
            Swal.fire("Éxito", "Alojamiento actualizado correctamente", "success");
            onClose(); // cierra el modal
        } catch (error) {
            console.error("Error al actualizar alojamiento:", error);
            const message =
                error.response?.data?.message || "No se pudo actualizar el alojamiento";
            Swal.fire("Error", message, "error");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg sm:w-10/12 lg:w-full max-w-md shadow-xl">
                <h2 className="text-xl font-bold mb-4">Editar Alojamiento</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-12/12  p-8">

                    {/* Nombre */}
                    <div>
                        <label className="text-lg flex items-start font-medium text-balance">Nombre</label>
                        <div className="relative mt-2">
                            <input
                                type="text"
                                {...register("name", { required: true })}
                                placeholder="Nombre del Alojamiento"
                                className=" input input-bordered w-full rounded-md  p-3 border border-slate-600"
                            />
                        </div>
                    </div>
                    {/* Dirección */}
                    <div>
                        <label className="text-lg flex items-start font-medium text-center">Dirección</label>
                        <div className="relative mt-1">
                            <input
                                type="text"
                                {...register("address", { required: true })}
                                placeholder="Dirección del alojamiento"
                                className=" input input-bordered w-full p-3 rounded-md border border-slate-600"
                            />
                        </div>
                    </div>
                    {/* Descripcion */}
                    <div>
                        <div className="flex justify-between items-center">
                            <label className="text-lg font-medium mb-2">Descripción </label>

                        </div>
                        <div className="relative mt-1">

                            <textarea
                                className=" pl-4 textarea textarea-bordered w-full pb-12 rounded-md border border-slate-600 "
                                placeholder="Descripcion"
                                {...register("description", { required: true })}
                            />
                        </div>
                    </div>
                    {/* Botones */}
                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn btn-ghost text-gray-700 p-2 rounded-md"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="btn bg-black text-white hover:bg-gray-900 p-1.5 rounded-md"
                        >
                            Guardar cambios
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}








