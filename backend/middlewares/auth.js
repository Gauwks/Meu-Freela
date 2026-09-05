import jwt from "jsonwebtoken";

const autenticar = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ mensagem: "Token não fornecido!" });
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
    return res.status(401).send({ mensagem: "Token inválido ou expirado!" });
  }
};

export default autenticar;