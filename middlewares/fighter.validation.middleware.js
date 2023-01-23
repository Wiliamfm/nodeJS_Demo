import { FIGHTER } from "../models/fighter.js";
import { fighterService } from "../services/fighterService.js";

const createFighterValid = (req, res, next) => {
  let f = req.body;
  let wrongFields = getExrtaOrMissingFields(Object.keys(f));
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
  // TODO: Implement validatior for FIGHTER entity during update
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

function getExrtaOrMissingFields(reqData, fighterKeys = Object.keys(FIGHTER)) {
  let missingFields = [...getExtraFields(reqData)];
  //Get missing fields
  fighterKeys.forEach(k => {
    if (!reqData.includes(k) && k !== "id" && k !== "health") {
      missingFields.push(k);
    }
  });
  return missingFields;
}