import axiosInstance from "./axiosInstance";
import {NahrainLogger} from "../debug/NahrainLogger";


export const postRequest = async (path, data, onSuccess, onError) => {
    try {
        const response = await axiosInstance.post(path, data);

        if (onSuccess) {
            onSuccess(response.data);
        }
    } catch (error) {
        if (onError) {
            onError(error);
        }
    }
};