// import axios from "axios";

// const API_URL = "http://127.0.0.1:3000/api/v1/auth/";

// class AuthService {
//   async login(user) {
//     return axios
//       .post(API_URL + "login", {
//         username: user.username,
//         password: user.password,
//       })
//       .then((response) => {
//         if (response.data.accessToken) {
//           localStorage.setItem("user", JSON.stringify(response.data));
//         }

//         return response.data;
//       });
//   }

//   logout() {
//     localStorage.removeItem("user");
//   }

//   signup(user) {
//     return axios.post(API_URL + "signup", {
//       username: user.username,
//       email: user.email,
//       password: user.password,
//     });
//   }
// }

// export default new AuthService();
