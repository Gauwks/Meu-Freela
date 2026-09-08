import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "../src/Context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PrivateLayout from "./components/PrivateLayout";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Dashboard from "./pages/Dashboard";
import Clientes from "./pages/Clientes";
import Projetos from "./pages/Projetos";
import Privado from "./Components/Privado";

function App(){
  return(

    <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/cadastro" element={<Cadastro />}/>

        <Route element={<ProtectRoute />}>
        <Route element={<Privado />}>
          <Route path="/home" element={Home}/>
          <Route path="/clientes" element={Clientes}/>
          <Route path="/projetos" element={Projetos}/>
        </Route>
        </Route>
          <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
      </BrowserRouter>
    </AuthProvider>

  );

}

export default App;