import { useState, useEffect } from "react";
import { CirclePlus, MapPin, Info, Trash2, Pencil } from "lucide-react";
import { getAccommodations } from "../services/accommodationService";

export default function Alojamientos() {
  const [open, setOpen] = useState(false);
  const [accommodations, setAccommodations] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAccommodations(); // <-- usa Axios
        setAccommodations(data);
      } catch (error) {
        console.error("Error al obtener alojamientos:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="p-6">
      {/* Botón y formulario desplegable */}
      <div className="flex justify-between items-center pb-4 mb-4">
        <h1 className="text-2xl font-bold">Alojamientos</h1>

        <button
          onClick={() => setOpen(!open)}
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-400 transition flex items-center gap-2"
        >
          <CirclePlus size={18} />
          {open ? "Cerrar formulario" : "Nuevo Alojamiento"}
        </button>
      </div>

      {open && (
        <form className="space-y-4 bg-gray-100 p-4 rounded-md shadow max-w-md">
          {/* Inputs del formulario */}
          <div>
            <label className="block text-sm font-medium mb-1">Nombre</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Nombre del alojamiento"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Correo</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="correo@ejemplo.com"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Guardar
          </button>
        </form>
      )}

      {/* Lista de alojamientos desde la API */}
      <div className="mt-6 space-y-4">
      {/* recorremos la info de la api */}
        {accommodations.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-md shadow p-4 flex justify-between items-start"
          >
            <div>
              <h2 className="text-lg font-bold">{item.name}</h2>
              <div className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                <MapPin size={14} /> {item.address || "Dirección no disponible"}
              </div>
              <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                <Info size={14} /> {item.description || "Sin descripción"}
              </div>
            </div>
            <div className="flex gap-2">
              <button className="text-blue-600 hover:text-blue-800">
                <Pencil size={16} />
              </button>
              <button className="text-red-600 hover:text-red-800">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
