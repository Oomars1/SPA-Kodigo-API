import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

export default function AlojamientoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [alojamiento, setAlojamiento] = useState(null);

  useEffect(() => {
    async function fetchDetalle() {
      try {
        const token = sessionStorage.getItem("token");
        const res = await axios.get(
          `https://apibookingsaccomodations-production.up.railway.app/api/V1/accomodation/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAlojamiento(res.data);
      } catch (err) {
        console.error("Error al obtener detalle del alojamiento", err);
      }
    }
    fetchDetalle();
  }, [id]);

  if (!alojamiento) return <p className="p-4">Cargando alojamiento...</p>;

  return (
    <div className="p-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 hover:underline flex items-center gap-1"
      >
        <ArrowLeft size={16} />
        Volver
      </button>

      <h1 className="text-2xl font-bold mb-2">{alojamiento.name}</h1>
      <p className="text-gray-600 mb-1">
        <strong>Dirección:</strong> {alojamiento.address || "No disponible"}
      </p>
      <p className="text-gray-600 mb-1">
        <strong>Descripción:</strong> {alojamiento.description || "No disponible"}
      </p>
      {/* Puedes mostrar más campos aquí si tu API devuelve más info */}
    </div>
  );
}
