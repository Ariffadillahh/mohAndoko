import axios from "axios";

let memoryAccessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  memoryAccessToken = token;
};

export const getAccessToken = () => memoryAccessToken;

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  withCredentials: true, 
});

api.interceptors.request.use(
  (config) => {
    if (memoryAccessToken) {
      config.headers.Authorization = `Bearer ${memoryAccessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/auth/refresh-token`,
          {},
          { withCredentials: true },
        );

        const newAccessToken = res.data.data.accessToken;
        setAccessToken(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        setAccessToken(null);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export const initAuth = async () => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/auth/refresh-token`,
      {},
      { withCredentials: true },
    );
    const token = res.data.data.accessToken;
    setAccessToken(token);
    return token;
  } catch (error) {
    setAccessToken(null);
    return null;
  }
};
