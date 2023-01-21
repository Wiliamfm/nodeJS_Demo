import { userRepository } from "../repositories/userRepository.js";

class UserService {
  // TODO: Implement methods to work with user

  isValidateEmail(email) {
    const emailRegex = /\w+@gmail.\w{1,3}/;
    return emailRegex.test(email);
  }

  isValidatePN(phoneNumber) {
    const phoneRegex = /\+380\d{9}/
    return phoneRegex.test(phoneNumber);
  }

  isValidatePassword(pwd) {
    return pwd.length >= 3 ? true : false;
  }

  isValidateUser(user) {
    if (this.isValidateEmail(user.email) && this.isValidatePN(user.phoneNumber) && this.isValidatePassword(user.password)) {
      if (userRepository.getByEmail(user.email) || userRepository.getByPhoneNumber(user.phoneNumber)) {
        return false;
      }
      return true;
    }
    return false;
  }

  create(user) {
    if (this.search(user)) {
      return false;
    }
    return userRepository.create(user);
  }

  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  getAll() {
    return userRepository.getAll();
  }

}

export default new UserService();

const userService = new UserService();

export { userService };
