import { API_URL } from "./globals";
import Axios from "axios";

class Auth {
  constructor() {
    this.token = null;
    this.user = null;
  }

  async login(username, password) {
    Axios.post(`${API_URL}/login`, {
      username,
      password,
    })
      .then((res) => {
        if (res.data.error) {
          console.log(res.data.error);
        } else {
          console.log(res.data);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          this.token = res.data.token;
          this.user = res.data.user;

          window.location.href = "/sites";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // create new user
  async createUser(
    username,
    password,
    firstname,
    lastname,
    accountType,
    phone
  ) {
    Axios.post(`${API_URL}/signup`, {
      username,
      password,
      firstname,
      phone,
      lastname,
      accountType,
    })
      .then((res) => {
        if (res.data.message) {
          alert("User Created");
        } else {
          alert("Error");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error Creating User");
      });
  }

  logout() {
    this.token = null;
    this.user = null;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  }

  loggedIn() {
    return !!localStorage.getItem("token");
  }

  getUser() {
    return this.user;
  }

  getFirstName() {
    return this.user.firstname;
  }
}

export default new Auth();
