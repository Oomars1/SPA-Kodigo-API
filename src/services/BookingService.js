// src/services/BookingService.js

import api from './api';

const getBookings = async () => {
    try {
        const response = await api.get('/api/V1/bookings');
        return response.data;
    } catch (error) {
        console.error('Error al obtener las reservas:', error);
        throw error;
    }
};

export default { getBookings };