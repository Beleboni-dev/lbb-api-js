import express from "express";
import { userRoutes } from "./api/routes/UserRoutes.js";
import cors from 'cors'
import connectDB from "./db.js";
const app = express();

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.get("/", (req, res) => {
  res.send("API funcionando");
});

app.use("/", userRoutes);
connectDB();
