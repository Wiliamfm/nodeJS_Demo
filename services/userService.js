import { userRepository } from "../repositories/userRepository.js";
import { setError } from "../errors/baseError.js";

class UserService {

  validateField(regex, fieldValue) {
    let match = fieldValue.match(regex);
    if (!match) {
      return false;
    }
    if (!(match[0] === fieldValue && match[0].length === fieldValue.length)) {
      return false;
    }
    return true;
  }

  isValidEmail(email) {
    const emailRegex = /\w+@gmail.\w{1,3}/;
    /*
    if (userRepository.getByEmail(email)) {
      return false;
    }
    */
    return this.validateField(emailRegex, email);
    //return emailRegex.test(email);
  }

  isValidPN(phoneNumber) {
    const phoneRegex = /\+380\d{9}/
    /*
    if (userRepository.getByPhoneNumber(phoneNumber)) {
      return false;
    }
    */
    return this.validateField(phoneRegex, phoneNumber);
    //return phoneRegex.test(phoneNumber);
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

  update(id, toUpdate) {
    return this.setResUser(userRepository.update(id, toUpdate));
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

  getByEmail(email) {
    const user = this.setResUser(userRepository.getByEmail(email));
    return user ? user : false;
  }

  getByPhoneNumber(phoneNumber) {
    const user = this.setResUser(userRepository.getByPhoneNumber(phoneNumber));
    return user ? user : false;
  }

  delete(id) {
    const a = userRepository.delete(id);
    return a.length === 0 ? false : a;
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