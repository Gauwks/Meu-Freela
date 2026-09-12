import { useAuth } from "../../Context/AuthContext";
import "./home.css";

const Home = () =>{

    const {usuario} = useAuth();

    return(
        <section className="home-page">
            <div className="header-page">
                <div>
                    <h1>Seja bem-vindo(a), {usuario?.nome || "Freelancer"}!</h1>
                </div>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <span className="stat-label">Clientes</span>
                    <strong>0</strong>
                    <small>Total de clientes cadastrados</small>
                </div>

                <div className="stat-card">
                    <span className="stat-label">Projetos</span>
                    <strong>0</strong>
                    <small>Em andamento</small>
                </div>

                 <div className="stat-card">
                    <span className="stat-label">Projetos Concluídos</span>
                    <strong>0</strong>
                    <small>Finalizados</small>
                </div>

                 <div className="stat-card">
                    <span className="stat-label">Plano Atual</span>
                    <strong>{usuario?.plano || "free"}</strong>
                    <small>Plano</small>
                </div>

                <div className="home-section">
                    <h2>Organize seus trabalhos</h2>
                    <p>Cadastre seus clientes e projetos de forma prática</p>
                </div>
            </div>
        </section>
    );

};

export default Home;
