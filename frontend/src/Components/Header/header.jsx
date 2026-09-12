import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import "./header.css";

const Header = () =>{
    const {usuario, logout} = useAuth();
    const navigate = useNavigate();

    const sair = () => {
        logout();
        navigate("/login");
    };

    return(
        <header className="navbar">

        <div className="nav-logo"> Meu Freela </div>
         <nav className="links">
            <NavLink to="/home" className={({isActive})=>
              isActive ? "nav-link active" : "links"
        }> Home </NavLink>

        <NavLink to="/clientes" className={({ isActive}) =>
           
            isActive ? "nav-link active" : "links"

        }> Cliente </NavLink>

        <NavLink to="/projetos" className={({isActive})=>
           isActive ? "nav-link active" : "links"
        }> Projetos </NavLink>
         </nav>

         <div className="nav-user">

         <span>{usuario?.nome || usuario?.email || "Usuário"}</span>
          <button type="button" onClick={sair} className="botao-logout">Sair</button>
         </div>
        </header>
    );

};


export default Header;
