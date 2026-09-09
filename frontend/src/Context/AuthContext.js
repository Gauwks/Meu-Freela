import { Children } from "react";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [usuario, setUsuario] = useState(() => {

        const dadosSalvos = localStorage.getItem("usuario");

        if(!dadosSalvos){
            return null;
        }

        return JSON.parse(dadosSalvos);

    });

    const login = (token, dadosUsuario) =>{
        localStorage.setItem("token", token);
        localStorage.setItem("usuario", JSON.stringify(dadosUsuario));
        setUsuario(dadosUsuario);
    };

     const logout = () =>{
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        setUsuario = null;
     };

     return (
        <AuthContext.Provider value={{usuario, login, logout}}>
            {children}
        </AuthContext.Provider>
     );
};

export const useAuth = () => useContext(AuthContext);