import axios from "axios";

const API_URL = "http://127.0.0.1:3000/";

export default {
  namespaced: true,
  state() {
    return {
      isLoggedIn: false,
    };
  },
  getters: {
    isLoggedIn(state) {
      return state.isLoggedIn;
    },
  },
  mutations: {
    controlLoggedIn(state) {
      state.isLoggedIn = !!localStorage.getItem("token");
    }
  },
  actions: {
    async login(context, payload) {
      try {
        const response = await axios.post(`${API_URL}api/v1/auth/login`, {
          username: payload.username,
          password: payload.password,
        });

        const responseData = response.data;

        localStorage.setItem("token", responseData.accessToken);
        localStorage.setItem("user", responseData.username);

        context.commit("controlLoggedIn");
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          throw new Error(error.response.data.message);
        } else {
          throw new Error("Failed to authenticate. Please try again later.");
        }
      }
    },
    async signup(_, payload) {
      try {
        await axios.post(`${API_URL}api/v1/auth/signup`, {
          username: payload.username,
          email: payload.email,
          password: payload.password,
        });

      } catch(error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          throw new Error(error.response.data.message);
        } else {
          throw new Error("Failed to authenticate. Please try again later.");
        }
      }
    },
    logout(context) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      context.commit("controlLoggedIn");
    },
  },
};
