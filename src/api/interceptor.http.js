import axios from "axios";

export const axiosInterceptor = () => {


  const addToken = (config) => { 
    const token = localStorage.getItem("token");
    if (token) {
      config.withCredentials = true;
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }

  axios.interceptors.request.use(
    (config) => {
      return addToken(config);
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      console.log(response);
      return response;
    },
    (error) => {
      console.log(error.response);
      if (error.response.status === 400) {
        console.log("Error 400");
      }
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );
}