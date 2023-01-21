import { BaseRepository } from "./baseRepository.js";

class UserRepository extends BaseRepository {
  constructor() {
    super("users");
  }

  getByEmail(email) {
    return this.dbContext.find({ email: email }).value()
  }

  getByPhoneNumber(pn) {
    return this.dbContext.find({ phoneNumber: pn }).value()
  }
}

const userRepository = new UserRepository();

export { userRepository };
