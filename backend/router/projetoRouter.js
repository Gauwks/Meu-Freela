import express from "express";
import bd from "../config/firebase.js";
import autenticar from "../middlewares/auth.js";

const router = express.Router();
const projetosRef = bd.collection("projetos");

router.get("/", autenticar, async(req, res) => {
    try {
        const {clienteId} = req.query;
        let query = projetosRef.where("userId", "==", req.userId);

        if(clienteId){
            query = query.where("clienteId", "==", clienteId);
        }
        const snapshot = await query.get();
        const projetos = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
        res.status(200).send(projetos);
    } catch (error){
        res.status(500).send({mensagem: "Falha ao buscar projetos", erro: error.message});
    }
});

router.post("/", autenticar, async (req, res) => {
    try{
        const {titulo, descricao, valor, clienteId} = req.body;

        const novoProjeto = await projetosRef.add({
            titulo,
            descricao: descricao || "",
            valor: Number(valor),
            status: "em_andamento",
            clienteId,
            userId: req.userId,
            dataCriacao: new Date()
        });

        res.status(201).send({id: novoProjeto.id, titulo, valor, status: "em_andamento"});
    } catch (error){
        res.status(500).send({mensagem: "Falha ao cadastrar projeto", erro: error.message});
    }
});


router.put("/:id", autenticar, async (req, res) =>{
    try{
        const {id} = req.params;
        const {status} = req.body;

        const projetoDoc = await projetosRef.doc(id).get();
        if(!projetoDoc.exists || projetoDoc.data().userId!== req.userId){
            return res.status(404).send({mensagem: "Projeto não encontrado!"});
        }

        await projetosRef.doc(id).update({ status });
        res.status(200).send({ mensagem: "Status atualizado" });

    }catch (error) {
        res.status(500).send({ mensagem: "Erro ao atualizar projeto", erro: error.message });
    }
});

router.delete("/:id",  autenticar, async (req, res) =>{
  try{
    const { id } = req.params;
    const projetoDoc = await projetosRef.doc(id).get();

    if(!projetoDoc.exists || projetoDoc.data().userId !== req.userId){
        return res.status(404).send({ mensagem: "Projeto não encontrado!" });
    }

    await projetosRef.doc(id).delete();
    res.status(200).send({ mensagem: "Projeto deletado!" })
  }catch (error) {
    res.status(500).send({ mensagem: "Erro ao deletar projeto", erro: 
error.message });
  }
});

export default router;