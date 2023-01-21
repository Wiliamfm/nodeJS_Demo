import { userService } from "./userService.js";

class AuthService {
  login(userData) {
    const user = userService.search(userData);
    if (!user) {
      throw Error("User not found");
    }
    return user;
  }

  register(user) {
    const newUser = userService.create(user);
    if (!newUser) {
      return false;
    }
    delete newUser.password;
    return newUser;
  }
}

const authService = new AuthService();

export { authService };
