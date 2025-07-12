import { Routes, Route, Outlet} from "react-router-dom";
import Aside from "../components/Aside";



export default function Home() {
  return (
    <div className="flex min-h-screen">
      <Aside />
       <main className="ml-64 w-full overflow-y-auto p-6">
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