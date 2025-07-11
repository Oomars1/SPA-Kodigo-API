import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import BookingService from '../services/BookingService';

const BookingCalendar = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const data = await BookingService.getBookings();
                console.log('Datos de la API:', data);

                if (!Array.isArray(data)) {
                    throw new Error('La respuesta no es un arreglo');
                }

                //  **********************  Mapear datos *************************
                const calendarEvents = data.map((booking) => ({
                    id: booking.id,
                    title: `${booking.status} - ${booking.booking}`,
                    start: new Date(booking.check_in_date),
                    end: new Date(booking.check_out_date),
                    extendedProps: {
                        status: booking.status || 'Sin estado',
                        user: booking.user || 'Sin huésped',
                        checkInDate: booking.check_in_date,
                        checkOutDate: booking.check_out_date,
                    },
                }));

                console.log('Eventos generados:', calendarEvents);
                setEvents(calendarEvents);
            } catch (error) {
                console.error('Error al cargar las reservas:', error);
                setError(error.message || 'Error desconocido');
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    if (loading) {
        return <div>Cargando calendario...</div>;
    }

    if (error) {
        return <div className="text-red-500">Error al cargar las reservas: {error}</div>;
    }

    if (events.length === 0) {
        return <div>No hay reservaciones disponibles.</div>;
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Calendario de Reservaciones</h2>
            <div style={{ height: '80vh' }}>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                    }}
                    events={events}
                    eventContent={(eventInfo) => (
                        <div className="fc-event-main px-1 py-0.5 text-xs truncate">
                            <strong>{eventInfo.timeText}</strong>
                            <i>{eventInfo.event.title}</i>
                            <br />
                            <small>
                                Estado: <b>{eventInfo.event.extendedProps.status}</b><br />
                                Entrada: {eventInfo.event.extendedProps.checkInDate}<br />
                                Salida: {eventInfo.event.extendedProps.checkOutDate}<br />
                                Huésped: <em>{eventInfo.event.extendedProps.user}</em>
                            </small>
                        </div>
                    )}
                    height="auto"
                />
            </div>
        </div>
    );
};

export default BookingCalendar;