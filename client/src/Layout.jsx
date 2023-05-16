import { Outlet } from "react-router-dom";
import Header from './Header';
export default function Layout({setPlaces, places}) {
  return (
    <div className="py-4 px-8 flex flex-col min-h-screen">
        <Header setPlaces={setPlaces} places={places}/>
        <Outlet />
    </div>
  )
}
