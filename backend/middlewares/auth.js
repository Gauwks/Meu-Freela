import jwt from "jsonwebtoken";

const autenticar = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ mensagem: "O token não foi fornecido!" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send({ mensagem: "Token mal formatado!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.userPlano = decoded.plano;
    next();
  } catch (error) {
    return res.status(401).send({ mensagem: "Esse token é inválido ou está expirado!" });
  }
};

export default autenticar;