import mongoose from "mongoose";

const conectBD = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Conexão com o Mongo, ok!");
    } catch(error) {
        console.error("Erro ao conectar com o Mongo!", error.mensage);
       process.exit(1)
    }
};

export default conectBD;