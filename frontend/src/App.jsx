import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import ProtectRouter from "./Components/ProtectRouter";
import Privado from "./Components/Privado";
import Login from "./Pages/Login/login";
import Cadastro from "./Pages/Cadastro/cadastro";
import Home from "./Pages/Home/home";
import Clientes from "./Pages/Clientes/clientes";
import Projetos from "./Pages/Projetos/projetos";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />

          <Route element={<ProtectRouter />}>
            <Route element={<Privado />}>
              <Route path="/home" element={<Home />} />
              <Route path="/clientes" element={<Clientes />} />
              <Route path="/projetos" element={<Projetos />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
