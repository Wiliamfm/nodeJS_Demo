import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import isAuthenticated from "../middlewares/auth.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

router.get("/", (req, res) => {
  try {
    const fighters = fighterService.getAll();
    res.data = {
      data: fighters,
      status: 200
    };
  } catch (error) {
    res.data = {
      data: error.msg,
      status: error.status
    }
  } finally {
    responseMiddleware(req, res);
  }
});

router.get("/:id");

router.post("/", isAuthenticated, createFighterValid, (req, res) => {
  try {
    const fighter = fighterService.create(req.body);
    res.data = {
      data: fighter,
      status: 200
    };
  } catch (error) {
    res.data = {
      data: error.msg,
      status: error.status
    }
  } finally {
    responseMiddleware(req, res);
  }
});

router.put("/:id");

router.delete("/:id");

export { router };
