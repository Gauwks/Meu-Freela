import { Outlet } from "react-router-dom";
import Header from "./Header/header";

const Privado = () => (
  <div className="container">
    <Header />
    <main className="main-container">
      <Outlet />
    </main>
  </div>
);

export default Privado;
