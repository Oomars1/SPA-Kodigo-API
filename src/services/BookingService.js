import api from "./api";

const getBookings = async () => {
    try {
        const response = await api.get("/api/V1/bookings");
        return response.data;
    } catch (error) {
        console.error("Error al obtener las reservas:", error);
        throw error;
    }
};

const updateBookingStatus = async (bookingId, newStatus) => {
    try {
        const token = sessionStorage.getItem("token"); // Asegúrate de que el token esté guardado
        const response = await api.patch(
            `/api/V1/status_booking/${bookingId}`,
            { status: newStatus },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error al actualizar el estado de la reserva:", error);
        throw error;
    }
};

export default {
    getBookings,
    updateBookingStatus,
};
