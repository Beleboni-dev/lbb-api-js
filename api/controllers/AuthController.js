import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";
import { compare } from "bcrypt";

const secret = "minhachavesecreta";

// Controlador para fazer login do usuário
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verifica se o usuário existe
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials mail" });
    }

    // Verifica se a senha está correta
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials pass" });
    }

    // Gera um token JWT
    const token = jwt.sign({ userId: user._id }, secret, {
      expiresIn: "6h",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export default loginUser;
