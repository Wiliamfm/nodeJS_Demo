import { userRepository } from "../repositories/userRepository.js";

class UserService {
  // TODO: Implement methods to work with user

  isValidEmail(email) {
    const emailRegex = /\w+@gmail.\w{1,3}/;
    return emailRegex.test(email);
  }

  isValidPN(phoneNumber) {
    const phoneRegex = /\+380\d{9}/
    return phoneRegex.test(phoneNumber);
  }

  isValidPassword(pwd) {
    return pwd.length >= 3 ? true : false;
  }

  isValidUser(user) {
    if (this.isValidEmail(user.email) && this.isValidPN(user.phoneNumber) && this.isValidPassword(user.password)) {
      if (userRepository.getByEmail(user.email) || userRepository.getByPhoneNumber(user.phoneNumber)) {
        return false;
      }
      return true;
    }
    return false;
  }

  create(user) {
    if (this.search(user)) {
      throw Error(`User ${user.name} already exists!`)
    }
    return this.setResUser(userRepository.create(user));
  }

  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  getAll() {
    return userRepository.getAll().map(u => {
      let user = this.setResUser(u);
      return user;
    })
  }

  getById(id) {
    const user = this.setResUser(userRepository.getOne({ id: id }));
    return user ? user : false;
  }

  setResUser(user) {
    if (!user) {
      return false;
    }
    let resUser = { ...user };
    delete resUser.password;
    return resUser;
  }

}

export default new UserService();

const userService = new UserService();

export { userService };
