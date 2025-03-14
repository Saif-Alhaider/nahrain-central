import axios from 'axios'
import {NahrainLogger} from "../debug/NahrainLogger";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL_DEV,
    withCredentials:true
})

axiosInstance.interceptors.request.use(
    (config) => {
        NahrainLogger.log(
            `📡 Axios Request Sent:\n` +
            `🔹 URL: ${config.baseURL}${config.url}\n` +
            `🔹 Method: ${config.method.toUpperCase()}\n` +
            `🔹 Headers: ${JSON.stringify(config.headers, null, 2)}\n` +
            `🔹 Data: ${JSON.stringify(config.data, null, 2)}`
        );
        return config;
    },
    (error) => {
        NahrainLogger.error("❌ Request Error:", error);
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        NahrainLogger.log(
            `✅ Axios Response Received:\n` +
            `🔹 URL: ${response.config.baseURL}${response.config.url}\n` +
            `🔹 Status: ${response.status}\n` +
            `🔹 Data: ${JSON.stringify(response.data, null, 2)}`
        );
        return response;
    },
    (error) => {
        NahrainLogger.error("❌ Axios Response Error:", error);
        return Promise.reject(error);
    }
);


export default axiosInstance