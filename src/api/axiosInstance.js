import axios from 'axios'
import {NahrainLogger} from "../debug/NahrainLogger";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL_DEV,
})

axiosInstance.interceptors.response.use(
    (response) => {
        NahrainLogger.log("✅ Axios Response Received:");
        NahrainLogger.log(`🔹 URL: ${response.config.baseURL}${response.config.url}`);
        NahrainLogger.log(`🔹 Status: ${response.status}`);
        NahrainLogger.log(`🔹 Data:`, response.data);
        return response; // ✅ Must return response
    },
    (error) => {
        NahrainLogger.error("❌ Axios Response Error:", error);
        return Promise.reject(error);
    }
);


axiosInstance.interceptors.request.use(
    (config) => {
        NahrainLogger.log("📡 Axios Request Sent:");
        NahrainLogger.log(`🔹 URL: ${config.baseURL}${config.url}`);
        NahrainLogger.log(`🔹 Method: ${config.method.toUpperCase()}`);
        NahrainLogger.log(`🔹 Headers:`, config.headers);
        NahrainLogger.log(`🔹 Data:`, config.data);
        return config;
    },
    (error) => {
        NahrainLogger.error("❌ Request Error:", error);
        return Promise.reject(error);
    }
)

export default axiosInstance