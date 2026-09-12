import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import api from "../../Servico/api.js";
import "./planos.css";

const PLANOS = [
    {
        id: "basico",
        nome: "Básico",
        preco: "R$ 19,90",
        descricao: "Para quem está começando a organizar os clientes.",
        recursos: [
            "Até 10 clientes cadastrados",
            "Projetos ilimitados",
            "Suporte por e-mail"
        ]
    },
    {
        id: "premium",
        nome: "Premium",
        preco: "R$ 39,90",
        descricao: "Para quem já tem uma carteira grande de clientes.",
        recursos: [
            "Clientes ilimitados",
            "Projetos ilimitados",
            "Suporte prioritário"
        ]
    }
];

const Planos = () => {

    const { usuario, atualizarUsuario } = useAuth();
    const navigate = useNavigate();

    const [planoSelecionado, setPlanoSelecionado] = useState(null);
    const [numeroCartao, setNumeroCartao] = useState("");
    const [nomeCartao, setNomeCartao] = useState("");
    const [validade, setValidade] = useState("");
    const [cvv, setCvv] = useState("");
    const [processando, setProcessando] = useState(false);
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState(false);

    const abrirCheckout = (plano) => {
        setPlanoSelecionado(plano);
        setErro("");
        setSucesso(false);
    };

    const fecharCheckout = () => {
        if (processando) return;
        setPlanoSelecionado(null);
        setSucesso(false);
        setErro("");
        setNumeroCartao("");
        setNomeCartao("");
        setValidade("");
        setCvv("");
    };

    const confirmarPagamento = async (evento) => {
        evento.preventDefault();
        setErro("");
        setProcessando(true);

        try {
            // Simula o tempo de processamento de um pagamento de verdade
            await new Promise((resolve) => setTimeout(resolve, 1500));

            await api.put("/auth/assinar", { plano: planoSelecionado.id });
            atualizarUsuario({ plano: planoSelecionado.id });
            setSucesso(true);
        } catch (error) {
            setErro(error.response?.data?.mensagem || "Não foi possível concluir o pagamento");
        } finally {
            setProcessando(false);
        }
    };

    return (
        <section className="page">
            <div className="header-page">
                <div>
                    <h1>Planos</h1>
                    <p>Escolha o plano que combina com o tamanho da sua carteira de clientes</p>
                </div>
            </div>

            <div className="grid-planos">
                {PLANOS.map((plano) => {
                    const ehPlanoAtual = usuario?.plano === plano.id;

                    return (
                        <div className="card-plano" key={plano.id}>
                            {ehPlanoAtual && <span className="selo-atual">Plano atual</span>}
                            <h2>{plano.nome}</h2>
                            <p className="preco-plano">{plano.preco}<span>/mês</span></p>
                            <p className="descricao-plano">{plano.descricao}</p>

                            <ul className="lista-recursos">
                                {plano.recursos.map((recurso) => (
                                    <li key={recurso}>{recurso}</li>
                                ))}
                            </ul>

                            <button
                                type="button"
                                className="primary-button"
                                disabled={ehPlanoAtual}
                                onClick={() => abrirCheckout(plano)}
                            >
                                {ehPlanoAtual ? "Você já está nesse plano" : "Assinar"}
                            </button>
                        </div>
                    );
                })}
            </div>

            {planoSelecionado && (
                <div className="modal-fundo" onClick={fecharCheckout}>
                    <div className="modal-checkout" onClick={(evento) => evento.stopPropagation()}>
                        {sucesso ? (
                            <>
                                <h2>Pagamento aprovado!</h2>
                                <p className="subtitulo-modal">
                                    Seu plano agora é {planoSelecionado.nome}. Aproveite os novos recursos.
                                </p>
                                <button
                                    type="button"
                                    className="primary-button"
                                    onClick={() => navigate("/home")}
                                >
                                    Voltar para a Home
                                </button>
                            </>
                        ) : (
                            <>
                                <h2>Assinar plano {planoSelecionado.nome}</h2>
                                <p className="subtitulo-modal">
                                    {planoSelecionado.preco}/mês · Isto é uma simulação, nenhum pagamento real será feito.
                                </p>

                                <form className="form-checkout" onSubmit={confirmarPagamento}>
                                    <label htmlFor="nomeCartao">Nome no cartão</label>
                                    <input
                                        id="nomeCartao"
                                        type="text"
                                        placeholder="Como está no cartão"
                                        value={nomeCartao}
                                        onChange={(evento) => setNomeCartao(evento.target.value)}
                                        required
                                    />

                                    <label htmlFor="numeroCartao">Número do cartão</label>
                                    <input
                                        id="numeroCartao"
                                        type="text"
                                        placeholder="0000 0000 0000 0000"
                                        maxLength={19}
                                        value={numeroCartao}
                                        onChange={(evento) => setNumeroCartao(evento.target.value)}
                                        required
                                    />

                                    <div className="linha-checkout">
                                        <div>
                                            <label htmlFor="validade">Validade</label>
                                            <input
                                                id="validade"
                                                type="text"
                                                placeholder="MM/AA"
                                                maxLength={5}
                                                value={validade}
                                                onChange={(evento) => setValidade(evento.target.value)}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="cvv">CVV</label>
                                            <input
                                                id="cvv"
                                                type="text"
                                                placeholder="000"
                                                maxLength={4}
                                                value={cvv}
                                                onChange={(evento) => setCvv(evento.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {erro && <p className="error-message">{erro}</p>}

                                    <div className="botoes-checkout">
                                        <button type="button" className="botao-cancelar" onClick={fecharCheckout} disabled={processando}>
                                            Cancelar
                                        </button>
                                        <button type="submit" className="primary-button" disabled={processando}>
                                            {processando ? "Processando..." : "Confirmar pagamento"}
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
};

export default Planos;
