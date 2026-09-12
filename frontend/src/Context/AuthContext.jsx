import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(() => {
    const dadosSalvos = localStorage.getItem("usuario");
    return dadosSalvos ? JSON.parse(dadosSalvos) : null;
  });

  const login = (token, dadosUsuario) => {
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(dadosUsuario));
    setUsuario(dadosUsuario);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// O hook é exportado junto ao provider para manter a API do contexto.
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
