import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../Servico/api.js";
import "./cadastro.css";

const Cadastro = () => {
    
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (evento) => {
    evento.preventDefault();
    setErro("");
    setMensagem("");
    setCarregando(true);

    try {
      await api.post("/auth/registro", {
        nome,
        email,
        senha
      });
      setMensagem("Cadastro realizado! Redirecionando para o login...");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setErro(
        error.response?.data?.mensagem ||
        "Não foi possível realizar o cadastro"
      );
    } finally {
      setCarregando(false);
    }

  };

  return (

    <main className="auth-page">
      <section className="card-auth">
        <div className="brand-auth">Meu Freela</div>

        <h1>Criar conta</h1>
        <p className="subtitulo">
          Organize seus clientes e projetos em um só lugar.
        </p>
        
        <form className="form-auth" onSubmit={handleSubmit}>

          <label htmlFor="nome">Nome</label>
          <input id="nome" type="text" placeholder="Seu nome" value={nome} onChange={(evento) => setNome(evento.target.value)} required/>

          <label htmlFor="email">E-mail</label>
          <input id="email" type="email" placeholder="voce@email.com" value={email} onChange={(evento) => setEmail(evento.target.value)}required/>

          <label htmlFor="senha">Senha</label>
          <input id="senha" type="password" placeholder="Crie uma senha" value={senha} onChange={(evento) => setSenha(evento.target.value)} minLength={6}  required />
          {erro && <p className="error-message">{erro}</p>}
          {mensagem && <p className="success-message">{mensagem}</p>}

          <button type="submit" className="primary-button auth-button" disabled={carregando}>
            {carregando ? "Criando conta..." : "Criar conta"}
          </button>
        </form>

        <p className="auth-footer">
          Já tem uma conta? <Link to="/login">Entrar</Link>
        </p>
      </section>
    </main>

  );

};

export default Cadastro
