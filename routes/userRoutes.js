import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import isAuthenticated from "../middlewares/auth.validation.middleware.js";

const router = Router();

// TODO: Implement route controllers for user
router.get("/", (req, res) => {
  return res.status(200).send(userService.getAll());
});

router.get("/:id", (req, res) => {
  const user = userService.getById(req.params.id);
  if (!user) {
    return res.status(404).send("user not found");
  }
  return res.send(user);
});

router.post("/", isAuthenticated, createUserValid, (req, res) => {
  try {
    return res.send(userService.create(req.body));
  } catch (err) {
    console.log(`ERROR in POST api/users/ \n${err}}`)
    return res.status(400).send(err);
  }
});

router.put("/:id");

router.delete("/:id");

export { router };
