import express from "express";
import bd from "../config/firebase.js";
import autenticar from "../middlewares/auth.js";

const router = express.Router();
const clientesRef = bd.collection("clientes");

router.get("/", autenticar, async (req, res) => {
 try{
     const snapshot = await clientesRef.where("userID", "==", req.userId).get();
     const clientes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}));
     res.status(200).send(clientes);
 } catch (error){
    res.status(500).send({mensagem: "Falha ao buscar clientes", erro: error.message});
 }

});


router.post("/", autenticar, async (req, res) => {
    try{
        const {nome, email, telefone} = req.body;

        if (req.planoUsuario === "free"){
            const snapshot = await clientes.Ref.where("userId", "==", req.userId).get();
           if(snapshot.size >=3){
            return res.status(403).send({
                mensagem: "Você atingiu o limite de clientes. Assine nosso plano para uso ilimitado!"
            });
           } 
        }
         const novoCliente = await clientesRef.add({
            nome,
            email: email || "",
            telefone: telefone || "",
            userId: req.userId,
            dataCriacao: new Date()
         });

         res.status(201).send({
            id: novoCliente, nome, email, telefone
        });
    } catch (error){
        res.status(500).send({mensagem: "Erro ao cadastrar cliente!", erro: error.message});
    }

});

