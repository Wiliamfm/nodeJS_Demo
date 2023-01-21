import { Router } from "express";
import { authService } from "../services/authService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import { createUserValid } from "../middlewares/user.validation.middleware.js";

const router = Router();

router.post(
  "/login",
  (req, res, next) => {
    try {
      // TODO: Implement login action (get the user if it exist with entered credentials)
      res.data = data;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.post("/register", createUserValid, (req, res, next) => {
  try {
    return res.send(authService.register(req.body));
  } catch (err) {
    console.log(err);
  } finally {
    next();
  }
});

export { router };
