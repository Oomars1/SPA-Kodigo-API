import React from 'react';
import { useForm } from 'react-hook-form';
import { createBooking } from '../services/bookinngServices';
import Swal from 'sweetalert2';

export default function NewBooking({ onSuccess, onClose }) {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await createBooking(data);
      Swal.fire("Éxito", "Reservación creada correctamente", "success");
      reset();
      if (onSuccess) onSuccess();
    } catch (error) {
      const message = error.response?.data?.message || "Error al registrar la reservación";
      Swal.fire("Error", message, "error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
          onClick={onClose}
        >
          ×
        </button>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Nueva Reservación</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Código de Reserva</label>
            <input
              type="text"
              {...register("booking", { required: true })}
              placeholder="Ej: BK123456"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Entrada</label>
              <input
                type="date"
                {...register("check_in_date", { required: true })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Salida</label>
              <input
                type="date"
                {...register("check_out_date", { required: true })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monto Total</label>
            <input
              type="number"
              {...register("total_amount", { required: true, min: 1 })}
              placeholder="Ej: 500"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ID Alojamiento</label>
              <input
                type="number"
                {...register("accomodation_id", { required: true })}
                placeholder="Ej: 1"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ID Usuario</label>
              <input
                type="number"
                {...register("user_id", { required: true })}
                placeholder="Ej: 1"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-3">
            <button
              type="reset"
              className="w-1/2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg"
              onClick={() => reset()}
            >
              Limpiar
            </button>
            <button
              type="submit"
              className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
