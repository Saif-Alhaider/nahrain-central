import axiosInstance from "./axiosInstance";


export const postRequest = ({path, data, onSuccess, onError, token}) => {
    const headers = token ? {Authorization: `Bearer ${token}`} : {}; // Add token only if defined
    axiosInstance.post(path, data, {headers})
        .then((response) => {
            if (onSuccess) {
                onSuccess?.(response.data);
            }
        })
        .catch((error) => {
            if (onError) {
                console.log(error)
                onError?.(error);
            }
        });
};

export const putRequest = (path, data, onSuccess, onError, token) => {
    const headers = token ? {Authorization: `Bearer ${token}`} : {}; // Add token only if defined
    axiosInstance.put(path, data, {headers})
        .then((response) => {
            if (onSuccess) {
                onSuccess?.(response.data);
            }
        })
        .catch((error) => {
            if (onError) {
                onError?.(error);
            }
        });
};

export const getRequest = ({path, params, token, onSuccess, onError}) => {
    const headers = token ? {Authorization: `Bearer ${token}`} : {}; // Add token only if defined
    axiosInstance.get(path, {headers, params})
        .then((response) => {
            if (onSuccess) {
                onSuccess(response.data);
            }
        })
        .catch((error) => {
            if (onError) {
                onError(error);
            }
        });
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

