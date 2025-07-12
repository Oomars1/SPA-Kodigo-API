import React, { useEffect, useState } from "react";
import { getBookings, updateBookingStatus } from "../services/bookinngServices";
import NewBooking from "../components/NewBooking";

export default function Reservaciones() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleCancelBooking = async (bookingId) => {
    try {
      await updateBookingStatus(bookingId, "CANCELLED");
      const data = await getBookings();
      setBookings(data);
      setLoading(false);
    } catch (error) {
      alert("No se pudo cancelar la reservación");
    }
  };

  useEffect(() => {
    async function fetchBooking() {
      try {
        const data = await getBookings();
        setBookings(data);
        console.log("Reservaciones obtenidas:", data);
      } catch (error) {
        console.error("Error al obtener las reservaciones:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBooking();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Encabezado y botón alineados */}
      <div className="flex items-center justify-between w-full mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Reservaciones</h1>
        <button
          onClick={() => setShowBookingModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-xl transition duration-300 shadow"
        >
          + Nueva reservación
        </button>
      </div>

      {/* Modal para nueva reservación */}
      {showBookingModal && (
        <NewBooking
          onSuccess={() => {
            setShowBookingModal(false);
            setLoading(true);
            getBookings().then((data) => {
              setBookings(data);
              setLoading(false);
            });
          }}
          onClose={() => setShowBookingModal(false)}
        />
      )}

      {/* Lista de reservaciones o mensaje de carga */}
      {loading ? (
        <p className="text-center text-gray-600">Cargando reservaciones...</p>
      ) : bookings.length === 0 ? (
        <p className="text-center text-gray-500">No hay reservaciones registradas.</p>
      ) : (
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition duration-300"
            >
              <h2 className="text-xl font-semibold text-blue-600 mb-1">
                {booking.user}
              </h2>
              <p className="text-gray-700 mb-1">
                Reservó en <span className="font-medium">{booking.accomodation}</span>
              </p>
              <p className="text-sm text-gray-600">
                Entrada: <span className="font-medium">{booking.check_in_date}</span> | Salida:{" "}
                <span className="font-medium">{booking.check_out_date}</span>
              </p>
              <p className="text-sm text-gray-600">
                Monto: <span className="font-medium">${booking.total_amount}</span> | Estado:{" "}
                <span className="font-medium">{booking.status}</span>
              </p>

              <button
                onClick={() => handleCancelBooking(booking.id)}
                className=" px-2 py-1 btn bg-red-600 text-white hover:bg-red-700 rounded-md mt-2"
                disabled={booking.status === "CANCELLED"}
              >
                Cancelar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
