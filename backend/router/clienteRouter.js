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

        if (req.userPlano === "free"){
            const snapshot = await clientesRef.where("userId", "==", req.userId).get();
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
        res.status(500).send({mensagem: "Falha ao cadastrar cliente!", erro: error.message});
    }

});


router.delete("/:id", autenticar, async (req, res) => {
    try{
        const {id} = req.params;
        const clienteDoc = await clientesRef.doc(id).get();

        if(!clienteDoc.exists || clienteDoc.data().userId !== req.userId){
            return res.status(404).send({mensagem: "Cliente não encontrado!"});
        }
        await clientesRef.doc(id).delete();
        res.status(200).send({mensagem: "Cliente deletado!"});
    } catch (error){
       res.status(500).send({mensagem: "Falha ao deletar cliente!", erro: error.message})
    }
});

export default router;

