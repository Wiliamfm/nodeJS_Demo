import { USER } from "../models/user.js";
import { userService } from "../services/userService.js";

const createUserValid = (req, res, next) => {
  // TODO: Implement validatior for USER entity during creation
  let user = req.body
  if (!userService.isValidUser(user)) {
    return res.status(400).send("User data not valid");
  }
  let missingFields = getExrtaOrMissingFields(Object.keys(user));
  if (missingFields.length > 0) {
    return res.status(400).send(`fields ${missingFields} are wrong`);
  }
  next();
};

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update
  next();
};

export { createUserValid, updateUserValid };

function getExrtaOrMissingFields(reqData, userKeys = Object.keys(USER)) {
  let missingFields = [];
  reqData.forEach(k => {
    if (!userKeys.includes(k) && k !== "id") {
      missingFields.push(k);
    }
  });
  userKeys.forEach(k => {
    if (!reqData.includes(k) && k !== "id") {
      missingFields.push(k);
    }
  });
  return missingFields;
}