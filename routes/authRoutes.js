import { Router } from "express";
import { authService } from "../services/authService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import { createUserValid } from "../middlewares/user.validation.middleware.js";

const router = Router();

router.post("/login", (req, res, next) => {
  try {
    let user = authService.login(req.body.username, req.body.password);
    /*
    if (!user) {
      return res.status(404).send("Incorrect password");
    }
    */
    req.session.regenerate(() => {
      req.session.user = user.id;
      req.session.save(err => {
        if (err) return next(err);
      })
      return res.send(user);
    });
  } catch (err) {
    console.log(`ERROR in POST api/auth/login \n${err}`);
    return res.status(err.status).send(err.msg);
  } finally {
    next();
  }
}
  //responseMiddleware
);

router.post("/register", createUserValid, (req, res, next) => {
  try {
    return res.send(authService.register(req.body));
  } catch (err) {
    console.log(`ERROR in POST api/auth/register \n${err}`);
    return res.status(400).send(String(err));
  } finally {
    next();
  }
});

router.post("/logout", (req, res) => {
  try {
    req.session.destroy();
    res.send("logout successfully");
  } catch (err) {
    res.status(400).send(String(err));
  }
});

export { router };
