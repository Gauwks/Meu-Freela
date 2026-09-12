import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import api from "../../Servico/api.js";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(evento) {
    evento.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      const resposta = await api.post("/auth/login", { email, senha });
      const { token, usuario } = resposta.data;
      login(token, usuario);
      navigate("/home");
    } catch (error) {
      setErro(error.response?.data?.mensagem || "Não foi possível realizar o login");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="card-auth">
        <div className="brand-auth">Meu Freela</div>
        <h1>Entrar</h1>
        <p className="subtitulo">Acesse sua área de trabalho.</p>
        <form className="form-auth" onSubmit={handleSubmit}>
          <label htmlFor="email">E-mail</label>
          <input id="email" type="email" value={email} onChange={(evento) => setEmail(evento.target.value)} required />
          <label htmlFor="senha">Senha</label>
          <input id="senha" type="password" value={senha} onChange={(evento) => setSenha(evento.target.value)} required />
          {erro && <p className="error-message">{erro}</p>}
          <button type="submit" className="primary-button auth-button" disabled={carregando}>
            {carregando ? "Entrando..." : "Entrar"}
          </button>
        </form>
        <p className="auth-footer">
          Ainda não tem conta? <Link to="/cadastro">Criar conta</Link>
        </p>
      </section>
    </main>
  );
};

export default Login;
