import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import bd from "../config/firebase.js";

const router = express.Router();
const usuariosRef = bd.collection("usuarios")

router.post("/registro", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const usuarioExiste = await usuariosRef.where("email", "==", email).get();
    if (!usuarioExiste.empty) {
      return res.status(400).send({ mensagem: "Esse email já está cadastrado." });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const novoUsuario = await usuariosRef.add({
      nome,
      email,
      senha: senhaCriptografada,
      plano: "free",
      dataCriacao: new Date()
    });

    res.status(201).send({ id: novoUsuario.id, nome, email, plano: "free" });
  } catch (error) {
    res.status(500).send({ mensagem: "Falha ao registrar usuário", erro: error.message });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    const resultado = await usuariosRef.where("email", "==", email).get();
    if (resultado.empty) {
      return res.status(404).send({ mensagem: "Usuário não encontrado!" });
    }

    const usuarioDoc = resultado.docs[0];
    const usuario = usuarioDoc.data();

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).send({ mensagem: "Senha incorreta! Verifique se está correta e tente novamente." });
    }

    const token = jwt.sign(
      { id: usuarioDoc.id, plano: usuario.plano },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).send({ token, nome: usuario.nome, plano: usuario.plano });
  } catch (error) {
    res.status(500).send({ mensagem: "Erro ao fazer login", erro: error.message });
  }
});

export default router;