

// src/services/accommodationService.js
import api from './api';

// Obtener alojamientos creamos la funcion asincrona 
//y como ya trabajamos con axios solo aggregamos lo demas del path y regresamos la data
export async function getAccommodations() {
  const response = await api.get('/api/V1/accomodations');
  return response.data;
}
