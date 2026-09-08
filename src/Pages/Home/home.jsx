import { useAuth } from "../../Context/AuthContext";

const Home = () =>{

    const {usuario} = useAuth();

    return(
        <section className="home-page">
            <div className="header-page">
                <div>
                    <h1>Seja bem-vindo(a), {usuario?.nome || "Freelancer"}!</h1>
                </div>
            </div>

            div.s
        </section>
    )

}