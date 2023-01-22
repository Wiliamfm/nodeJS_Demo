import { userService } from "./userService.js";
import { setError } from "../errors/baseError.js";

class AuthService {

  login(username, password) {
    const user = userService.search({ email: username });
    if (!user) {
      throw new setError(404, "User not found!")
    }
    if (user.email !== username || user.password !== password) {
      throw new setError(400, "Credentials are not valid!");
    }
    return user;
  }

  register(user) {
    try {
      return userService.create(user);
    } catch (error) {
      throw Error(error);
    }
  }

}

const authService = new AuthService();

export { authService };
