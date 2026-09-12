import { useEffect, useState } from "react";
import api from "../../Servico/api.js";
import "./projetos.css";

const Projetos = () => {

    const [projetos, setProjetos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [modalAberto, setModalAberto] = useState(false);

    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState("");
    const [clienteId, setClienteId] = useState("");

    const [erro, setErro] = useState("");
    const [mensagem, setMensagem] = useState("");

    const carregarProjetos = async () => {
        try {
            const resposta = await api.get("/projetos");
            setProjetos(resposta.data);
        } catch (error) {
            setErro(error.response?.data?.mensagem || "Erro ao carregar projetos");
        }
    };

    const carregarClientes = async () => {
        try {
            const resposta = await api.get("/clientes");
            setClientes(resposta.data);
        } catch (error) {
            setErro(error.response?.data?.mensagem || "Erro ao carregar clientes");
        }
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            carregarProjetos();
            carregarClientes();
        }, 0);
        return () => clearTimeout(timeoutId);
    }, []);

    const abrirModal = () => {
        setErro("");
        setMensagem("");
        setModalAberto(true);
    };

    const fecharModal = () => {
        setModalAberto(false);
        setTitulo("");
        setDescricao("");
        setValor("");
        setClienteId("");
    };

    const criarProjeto = async (evento) => {
        evento.preventDefault();
        setErro("");
        setMensagem("");

        try {
            await api.post("/projetos", { titulo, descricao, valor, clienteId });
            setMensagem("Projeto criado com sucesso!");
            fecharModal();
            await carregarProjetos();
        } catch (error) {
            setErro(error.response?.data?.mensagem || "Erro ao criar projeto");
        }
    };

    const concluirProjeto = async (id) => {
        try {
            await api.put(`/projetos/${id}`, { status: "concluido" });
            await carregarProjetos();
        } catch (error) {
            setErro(error.response?.data?.mensagem || "Erro ao atualizar projeto");
        }
    };

    const excluirProjeto = async (id) => {
        try {
            await api.delete(`/projetos/${id}`);
            await carregarProjetos();
        } catch (error) {
            setErro(error.response?.data?.mensagem || "Erro ao excluir projeto");
        }
    };

    const nomeDoCliente = (id) => {
        const cliente = clientes.find((clienteItem) => clienteItem.id === id);
        return cliente ? cliente.nome : "Sem cliente vinculado";
    };

    return (
        <section className="page">
            <div className="header page">
                <div>
                    <h1>Projetos</h1>
                    <p>Organize seus projetos e acompanhe cada avanço</p>
                </div>
                <button type="button" className="button-primary" onClick={abrirModal}>
                    Novo Projeto
                </button>
            </div>

            {mensagem && <p className="mensagem-sucesso">{mensagem}</p>}
            {erro && <p className="mensagem-erro">{erro}</p>}

            {projetos.length === 0 ? (
                <div className="espaco-vazio">
                    <h2>Não há nenhum projeto aqui</h2>
                </div>
            ) : (
                <div className="lista-projetos">
                    {projetos.map((projeto) => (
                        <div className="card-projeto" key={projeto.id}>
                            <div className="cabecalho-card-projeto">
                                <h3>{projeto.titulo}</h3>
                                <span className={`status-projeto status-${projeto.status}`}>
                                    {projeto.status === "concluido" ? "Concluído" : "Em andamento"}
                                </span>
                            </div>
                            <p>{nomeDoCliente(projeto.clienteId)}</p>
                            {projeto.descricao && <p>{projeto.descricao}</p>}
                            <p className="valor-projeto">R$ {Number(projeto.valor).toFixed(2)}</p>

                            <div className="acoes-projeto">
                                {projeto.status !== "concluido" && (
                                    <button type="button" className="botao-concluir" onClick={() => concluirProjeto(projeto.id)}>
                                        Marcar como concluído
                                    </button>
                                )}
                                <button type="button" className="botao-excluir" onClick={() => excluirProjeto(projeto.id)}>
                                    Excluir
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {modalAberto && (
                <div className="modal-fundo" onClick={fecharModal}>
                    <div className="modal-projeto" onClick={(evento) => evento.stopPropagation()}>
                        <h2>Novo projeto</h2>

                        <form className="form-projeto" onSubmit={criarProjeto}>
                            <label htmlFor="titulo">Título</label>
                            <input
                                id="titulo"
                                type="text"
                                placeholder="Nome do projeto"
                                value={titulo}
                                onChange={(evento) => setTitulo(evento.target.value)}
                                required
                            />

                            <label htmlFor="cliente">Cliente</label>
                            <select
                                id="cliente"
                                value={clienteId}
                                onChange={(evento) => setClienteId(evento.target.value)}
                            >
                                <option value="">Sem cliente vinculado</option>
                                {clientes.map((cliente) => (
                                    <option value={cliente.id} key={cliente.id}>{cliente.nome}</option>
                                ))}
                            </select>

                            <label htmlFor="valor">Valor (R$)</label>
                            <input
                                id="valor"
                                type="number"
                                step="0.01"
                                min="0"
                                placeholder="0,00"
                                value={valor}
                                onChange={(evento) => setValor(evento.target.value)}
                                required
                            />

                            <label htmlFor="descricao">Descrição</label>
                            <textarea
                                id="descricao"
                                placeholder="Detalhes do projeto (opcional)"
                                value={descricao}
                                onChange={(evento) => setDescricao(evento.target.value)}
                                rows={3}
                            />

                            {erro && <p className="mensagem-erro">{erro}</p>}

                            <div className="botoes-modal-projeto">
                                <button type="button" className="botao-cancelar" onClick={fecharModal}>
                                    Cancelar
                                </button>
                                <button type="submit" className="button-primary">
                                    Criar projeto
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Projetos;
