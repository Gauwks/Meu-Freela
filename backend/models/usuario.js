import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema ({

 nome: {type: String, required: true}, 
 email: {type: String, required: true, unique: true},
 senha: {type: String, required: true, },
 plano: {type: String, default: "free"},
 dataCriacao: { type: Date, default: Date.now }

});

export default mongoose.model("Usuario", usuarioSchema);
