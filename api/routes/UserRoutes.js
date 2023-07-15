
import loginUser from "../controllers/AuthController.js";
import createUser from "../controllers/UserController.js";
import authenticate from "../middlewares/AuthMiddleware.js";
import createReview from "../controllers/ReviewController.js";
import { Router } from "express";


const router = Router();

router.post("/users", createUser);
router.post("/login", loginUser);
router.post("/reviews", authenticate, createReview);

export const userRoutes = router;
