import jwt from "jsonwebtoken";


const secret = "minhachavesecreta";

const authenticate = (req, res, next) => {
  // Verifica a presença do token no cabeçalho, cookie ou qualquer outra forma que você esteja usando
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // Decodifica o token e extrai o userId do payload
    const decodedToken = jwt.verify(token, secret);
    req.user = { userId: decodedToken.userId };

    // Continue para o próximo middleware ou controlador de rota
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

export default authenticate;
