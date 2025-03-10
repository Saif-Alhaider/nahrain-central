import axiosInstance from "./axiosInstance";


export const postRequest = async (path, data, onSuccess, onError, token) => {
    try {
        const headers = token ? {Authorization: `Bearer ${token}`} : {}; // Add token only if defined

        const response = await axiosInstance.post(path, data, {headers});

        if (onSuccess) {
            onSuccess(response.data);
        }
    } catch (error) {
        if (onError) {
            onError(error);
        }
    }
};

export const getRequest = async (path, onSuccess, onError) => {
    try {
        const response = await axiosInstance.get(path);

        if (onSuccess) {
            onSuccess(response.data);
        }
    } catch (error) {
        if (onError) {
            onError(error);
        }
    }
};

export const getImageRequest = async (path, onSuccess, onError, token) => {
    try {
        const headers = token ? {Authorization: `Bearer ${token}`} : {}; // Add token only if defined
        const response = await axiosInstance.get(path, {
            headers,
            responseType: "blob", // Ensure response is treated as an image blob
        });

        if (onSuccess) {
            onSuccess(URL.createObjectURL(response.data)); // Convert blob to object URL
        }
    } catch (error) {
        if (onError) {
            onError(error);
        }
    }
};

