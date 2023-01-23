import { fighterRepository } from "../repositories/fighterRepository.js";
import { setError } from "../errors/baseError.js";

class FighterService {

  getAll() {
    return fighterRepository.getAll();
  }

  getById(id) {
    let f = fighterRepository.getOne({ id: id });
    if (!f || f === undefined) {
      throw new setError(404, "Fighter not found");
    }
    return f;
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

  delete(id) {
    let a = fighterRepository.delete(id);
    return a.length === 0 ? false : a;
  }

}

const fighterService = new FighterService();

export { fighterService };
