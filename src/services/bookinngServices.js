import api from "./api";

// Obtener todas las reservaciones 

export async function getBookings(params) {
    const response = await api.get('/api/V1/bookings');
    return response.data;
}

export const createBooking = async (data) =>{
    const response = await api.post('/api/V1/booking', data);
    return response.data;
}

export async function updateBookingStatus(id, status) {
    const response = await api.patch(`/api/V1/status_booking/${id}`, { status });
    return response.data;
}