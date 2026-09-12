import "./projetos.css";

const Projetos = () =>{
    return(

        <section className="page">
            <div className="header page">
                <div>
                    <h1>Projetos</h1>
                    <p>Organize seus projetos e acompanhe cada avanço</p>
                </div>
                <button type="button" className="button-primary">Novo Projeto</button>
            </div>

            <div className="espaco-vazio">
                <h2>Não há nenhum projeto aqui</h2>
            </div>
        </section>

    );
};


export default Projetos;
