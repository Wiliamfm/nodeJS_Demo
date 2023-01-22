import { USER } from "../models/user.js";
import { userService } from "../services/userService.js";

const createUserValid = (req, res, next) => {
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
  let user = userService.getById(req.params.id);
  //is this validation necessary? cause the update method on repository already search by id
  if (!user) {
    return res.status(404).send("User not found");
  }
  req.found = user;
  let userToUpdate = req.body;
  if (userToUpdate.email && (!userService.isValidEmail(userToUpdate.email) || userService.getByEmail(userToUpdate.email))) {
    return res.status(400).send("User email not valid");
  }
  if (userToUpdate.phoneNumber && (!userService.isValidPN(userToUpdate.phoneNumber) || userService.getByPhoneNumber(userToUpdate.phoneNumber))) {
    return res.status(400).send("User phone number not valid");
  }
  let extraFields = getExtraFields(Object.keys(userToUpdate));
  if (extraFields.length > 0) {
    return res.status(400).send(`fields ${extraFields} cannot be in User`);
  }
  next();
};

export { createUserValid, updateUserValid };

function getExtraFields(reqData, userKeys = Object.keys(USER)) {
  let extraFields = [];
  reqData.forEach(k => {
    if (!userKeys.includes(k) && k !== "id") {
      extraFields.push(k);
    }
  });
  return extraFields;
}

function getExrtaOrMissingFields(reqData, userKeys = Object.keys(USER)) {
  let missingFields = [...getExtraFields(reqData)];
  //Get missing fields
  userKeys.forEach(k => {
    if (!reqData.includes(k) && k !== "id") {
      missingFields.push(k);
    }
  });
  return missingFields;
}