import { FIGHTER } from "../models/fighter.js";
import { fighterService } from "../services/fighterService.js";
import userService from "../services/userService.js";

const createFighterValid = (req, res, next) => {
  let f = req.body;
  let wrongFields = getExtraOrMissingFields(Object.keys(f));
  if (wrongFields.length !== 0) {
    return res.status(400).send(`Fields ${wrongFields} are not valid`).end();
  }
  if (!f.health) {
    f.health = 100;
  }
  if (!fighterService.isValidName(f.name) || !fighterService.isValidPower(f.power) || !fighterService.isValidDefense(f.defense) || !fighterService.isValidHealth(f.health)) {
    return res.status(400).send("Data no valid").end();
  }
  next();
};

const updateFighterValid = (req, res, next) => {
  /*
  let user = userService.getById(req.params.id);
  //is this validation necessary? cause the update method on repository already search by id
  if (!user) {
    return res.status(404).send("User not found");
  }
  */
  let fToUpdate = req.body;
  let wrongFields = getExtraFields(Object.keys(fToUpdate));
  if (wrongFields.length !== 0) {
    return res.status(400).send(`Fields ${wrongFields} are not valid`).end();
  }
  if (fToUpdate.name && !fighterService.isValidName(fToUpdate.name)) {
    return res.status(400).send("Name is invalid").end();
  }
  if (fToUpdate.health && !fighterService.isValidHealth(fToUpdate.health)) {
    return res.status(400).send("Health is invalid").end();
  }
  if (fToUpdate.power && !fighterService.isValidPower(fToUpdate.power)) {
    return res.status(400).send("Power is invalid").end();
  }
  if (fToUpdate.defense && !fighterService.isValidDefense(fToUpdate.defense)) {
    return res.status(400).send("Defense is invalid").end();
  }
  next();
};

export { createFighterValid, updateFighterValid };

function getExtraFields(reqData, fighterKeys = Object.keys(FIGHTER)) {
  let extraFields = [];
  reqData.forEach(k => {
    if (!fighterKeys.includes(k) || k === "id") {
      extraFields.push(k);
    }
  });
  return extraFields;
}

function getExtraOrMissingFields(reqData, fighterKeys = Object.keys(FIGHTER)) {
  let missingFields = [...getExtraFields(reqData)];
  //Get missing fields
  fighterKeys.forEach(k => {
    if (!reqData.includes(k) && k !== "id" && k !== "health") {
      missingFields.push(k);
    }
  });
  return missingFields;
}