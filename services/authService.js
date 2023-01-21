import { userService } from "./userService.js";

class AuthService {
  login(username, password) {
    const user = userService.search({ email: username });
    if (!user) {
      throw Error("User not found");
    }
    if (user.email !== username || user.password !== password) {
      return false;
      throw Error("Credentials are not valid");
    }
    delete user.password;
    return user;
  }

  register(user) {
    try {
      return userService.create(user);
    } catch (error) {
      throw Error(error);
    }
    const newUser = userService.create(user);
    if (!newUser) {
      return false;
    }
    return newUser;
  }
}

const authService = new AuthService();

export { authService };
