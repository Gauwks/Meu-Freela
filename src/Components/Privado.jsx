import { Outlet } from "react-router-dom";
import Header from "./Header/header";

const Privado = () => {
    return (

        <div className="container">
            <Navbar />
            <main className="main-container">
                
             <Outlet />

            </main>

        </div>

    );
};

export default Privado;