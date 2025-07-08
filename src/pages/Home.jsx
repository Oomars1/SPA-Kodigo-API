import { Routes, Route, Outlet} from "react-router-dom";
import Aside from "../components/Aside";
import Alojamientos from "./Alojamientos";
import Reservaciones from "./Reservaciones";


export default function Home() {
  return (
    <div className="flex">
      <Aside />
      <main className="flex-1 p-6 bg-gray-50">
        <Outlet /> {/* Aquí se renderizan las rutas hijas */}
      </main>
    </div>
  );
}
// export default function Home() {
//   return (
//     <div className="flex">
//       <Aside />
//       <main className="flex-1 p-6 bg-gray-50">
//         <Routes>
//           <Route index element={<Alojamientos />} />
//           <Route path="alojamientos" element={<Alojamientos />} />
//           <Route path="reservaciones" element={<Reservaciones />} />
//         </Routes>
//       </main>
//     </div>
//   );
// }