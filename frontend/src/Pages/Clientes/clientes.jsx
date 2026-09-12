import { useEffect, useState } from "react";
import api from "../../Servico/api.js";
import "./clientes.css";

const Clientes = () =>{

  const [clientes, setClientes] = useState([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");

  const carregarClientes = async () =>{
    try{
        const resposta = await api.get("/clientes");
        setClientes(resposta.data);
    }catch(error){
        setErro(error.response?.data?.mensagem || "Erro ao carregar clientes");
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(carregarClientes, 0);
    return () => clearTimeout(timeoutId);
  }, []);


  const criarCliente = async (evento) =>{
        evento.preventDefault();
        setErro("");
        setMensagem("");

        try{
            await api.post("/clientes", { nome, email, telefone });
            setNome("");
            setEmail("");
            setTelefone("");
            setMensagem("Cliente criado com sucesso!");
            await carregarClientes();
        } catch(error){
            setErro(error.response?.data?.mensagem || "Erro ao criar cliente");
        }
  };

   return (
    <section className="page">
      <div className="header-page">
        <div>
          <h1>Clientes</h1>
        </div>
      </div>
      <form className="form-cliente" onSubmit={criarCliente}>
        <input type="text" placeholder="Nome" value={nome} onChange={(evento) => setNome(evento.target.value)} required
        />
        <input type="email" placeholder="E-mail" value={email} onChange={(evento) => setEmail(evento.target.value)}
        />
        <input type="text" placeholder="Telefone" value={telefone} onChange={(evento) => setTelefone(evento.target.value)}
        />
        <button type="submit" className="primary-button">
          Adicionar cliente
        </button>
      </form>
      {mensagem && <p className="mensagem-sucesso">{mensagem}</p>}
      {erro && <p className="mensagem-erro">{erro}</p>}
      <div className="lista-clientes">
        {clientes.length === 0 ? (
          <div className="vazio">
            <h2>Não há nenhum cliente cadastrado</h2>
          </div>
        ) : (
          clientes.map((cliente) => (
            <div className="card-cliente" key={cliente.id}>
              <h3>{cliente.nome}</h3>
              <p>{cliente.email || "Sem email"}</p>
              <p>{cliente.telefone || "Sem telefone"}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Clientes;
