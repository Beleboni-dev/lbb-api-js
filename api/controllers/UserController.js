import UserModel from '../models/UserModel.js'
import { genSalt, hash } from "bcrypt";

// Controlador para criar um novo usuário
const createUser = async (req, res) => {
  try {
    const { name, birthdate, email, password } = req.body;

    // Verifica se o e-mail já está em uso
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "E-mail already exists" });
    }

    // Gera o salt para o bcrypt
    const salt = await genSalt(10); // Defina o número de salt rounds desejado

    // Cria o hash da senha
    const hashedPassword = await hash(password, salt);

    // Cria o novo usuário com a senha hash
    const user = new UserModel({ name, birthdate, email, password: hashedPassword });
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export default createUser;
