import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {

  getAll() {
    return fighterRepository.getAll();
  }

  getById(id) {

  }

  create(fighter) {
    fighter.name = fighter.name.toLocaleLowerCase()
    return fighterRepository.create(fighter);
  }

  getByName(name) {
    const f = fighterRepository.getOne({ name: name });
    return f ? f : null;
  }

  isValidName(name) {
    if (typeof (name) !== "string") {
      return false
    }
    return this.getByName(name.toLocaleLowerCase()) ? false : true;
  }

  isValidPower(power) {
    if (!Number.isInteger(power)) {
      return false;
    }
    return (power >= 1 && power <= 100) ? true : false;
  }

  isValidDefense(defense) {
    if (!Number.isInteger(defense)) {
      return false;
    }
    return (defense >= 1 && defense <= 10) ? true : false;
  }

  isValidHealth(health) {
    if (!Number.isInteger(health)) {
      return false;
    }
    return (health >= 80 && health <= 120) ? true : false;
  }

}

const fighterService = new FighterService();

export { fighterService };
