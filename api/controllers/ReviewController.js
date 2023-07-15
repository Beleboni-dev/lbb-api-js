import reviewModel from "../models/ReviewModel.js";

// Controlador para criar uma nova avaliação
const createReview = async (req, res) => {
  try {
    const { movieId, text, rating } = req.body;
    const userId = req.user && req.user.userId; // Obtém o userId a partir do token JWT

    // Cria a nova avaliação
    const review = new reviewModel({ movieId, userId, text, rating });
    const savedReview = await review.save();

    res.status(201).json(savedReview);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Controlador para editar uma avaliação existente
const editReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { text, rating } = req.body;
    const userId = req.user && req.user.userId; // Obtém o userId a partir do token JWT

    // Verifica se a avaliação existe
    const review = await findById(reviewId);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    // Verifica se o usuário é o autor da avaliação
    if (review.userId !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    // Atualiza a avaliação
    review.text = text;
    review.rating = rating;
    const updatedReview = await review.save();

    res.json(updatedReview);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export default createReview;
