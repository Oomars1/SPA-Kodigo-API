import React, { useState } from "react";
import { Menu, LogOut } from "lucide-react";
import BookingCalendar from "../components/BookingCalendar";
import { NavLink, useNavigate } from "react-router-dom";

const Calendario = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  //protegemos  la pagina
  const handleLogout = () => {
    // Eliminar token
    sessionStorage.removeItem("token");

    // Redirigir al login
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* NAVBAR MOBILE */}
      <nav className="bg-white shadow px-4 py-3 flex justify-between items-center sticky top-0 z-50 lg:hidden">
        <h1 className="text-xl font-bold text-gray-800">Kodigo App</h1>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-gray-800"
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Menú desplegable mobile */}
      {menuOpen && (
        <div className="bg-white shadow-md p-4 space-y-2 lg:hidden">
          <a
            href="/home/alojamientos"
            className="block w-full text-left px-2 py-1 rounded hover:bg-gray-200 font-medium"
          >
            Alojamientos
          </a>
          <a
            href="/home/reservaciones"
            className="block w-full text-left px-2 py-1 rounded hover:bg-gray-200 font-medium"
          >
            Reservaciones
          </a>
          <a
            href="/home/calendario"
            className="block w-full text-left px-2 py-1 rounded hover:bg-gray-200 font-bold"
          >
            Calendario
          </a>

          {/* Botón Cerrar sesión */}
          <button
            onClick={() => {
              handleLogout(); // Elimina el token y redirige
              setMenuOpen(false); // Cierra el menú desplegable
            }}
            className="flex items-center gap-2 w-full px-3 py-2 mt-2 text-sm font-medium text-gray-800 hover:bg-red-100 transition"
          >
            <LogOut size={20} />
            Cerrar sesión
          </button>
        </div>
      )}

      {/* CONTENIDO DEL CALENDARIO */}
      <div className="p-4">
        <BookingCalendar />
      </div>
    </div>
  );
};

export default Calendario;
