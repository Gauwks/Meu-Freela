import { Outlet } from "react-router-dom";
import Header from "./Header/header";
import Footer from "./Footer/footer";

const Privado = () => (
  <div className="container">
    <Header />
    <main className="main-container">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default Privado;
