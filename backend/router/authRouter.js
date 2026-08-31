import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Usuario from "../models/usuario.js";
import usuario from "../models/usuario.js";

const router = express.Router();

router.post("/registro", async (req, res)=>{

try{
    const {nome, email, senha} = req.body;

    const UsuarioExiste = await Usuario.findOne ({email});
    if (UsuarioExiste) {
        return res.status(400).send("Esse email já está cadastrado!");
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const usario = await Usuario.create({

        nome,
        email,
        senha: senhaCriptografada

    });

    res.status(201).send({ id: usuario._id, nome: usuario.nome, email: usuario.email, plano: usuario.plano })
     } catch (error) {
    res.status(500).send({ mensagem: "Erro ao registrar usuário", erro: error.message });
  }

});

router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(404).send({ mensagem: "Usuário não encontrado" });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).send({ mensagem: "Senha incorreta!" });
    }

    const token = jwt.sign(
      { id: usuario._id, plano: usuario.plano },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).send({ token, nome: user.nome, plano: user.plano });
  } catch (error) {
    res.status(500).send({ mensagem: "Erro ao fazer login", erro: error.message });
  }
});

export default router;