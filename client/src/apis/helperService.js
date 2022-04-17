import axios from "axios";
const baseURL = "http://localhost:5000";

const helperService = {
  createUser: async (payload, config) => {
    try {
      let {
        status,
        data: { message, newUser },
      } = await axios.post(`${baseURL}/user/create`, payload, config);
      if (status === 201) {
        return Promise.resolve({
          status,
          message,
          newUser,
        });
      }
    } catch (err) {
      console.log(err);
      let status = 500,
        message = "Internal Server Error";
      if (err.response) {
        status = err.response.status;
        message = err.response.data;
      }
      return Promise.reject({
        status,
        message,
      });
    }
  },
  getAllUsers: async () => {
    try {
      let {
        status,
        data: { message, users },
      } = await axios.get(`${baseURL}/user/get/all`);
      if (status === 200) {
        return Promise.resolve({
          status,
          message,
          users,
        });
      }
    } catch (err) {
      console.log(err);
      let status = 500,
        message = "Internal Server Error";
      if (err.response) {
        status = err.response.status;
        message = err.response.data;
      }
      return Promise.reject({
        status,
        message,
      });
    }
  },
  deleteUser: async (payload) => {
    let { id } = payload;
    try {
      let { status, data } = await axios.post(
        `${baseURL}/user/delete?id=${id}`
      );
      if (status === 202) {
        return Promise.resolve({
          status,
          message: data,
        });
      }
    } catch (err) {
      console.log(err);
      let status = 500,
        message = "Internal Server Error";
      if (err.response) {
        status = err.response.status;
        message = err.response.data;
      }
      return Promise.reject({
        status,
        message,
      });
    }
  },
};

export default helperService;
