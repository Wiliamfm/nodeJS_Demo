import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

// TODO: Implement route controllers for user
router.get("/", (req, res) => {
  return res.status(200).send(userService.getAll());
});

router.get("/:id");

router.post("");

router.put("/:id");

router.delete("/:id");

export { router };
