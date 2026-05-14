import { axiosInstance } from ".";

export const AddShow = async (payload) => {
    try {
        const response = await axiosInstance.post("api/shows/add-show", payload);
        return response.data;
    } catch (error) {
        return err.message;
    }
};


export const UpdateShow = async (payload) => {
    try {
        const response = await axiosInstance.put("api/shows/update-show", payload);
        console.log(payload, response);
        return response.data;
    } catch (error) {
        return err.response;
    }
};

export const GetShowsByTheatre = async (payload) => {
    try {
        const response = await axiosInstance.post("api/shows/get-all-shows-by-theatre", payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
};


export const DeleteShow = async (payload) => {
    try {
        const response = await axiosInstance.delete("api/shows/delete-show", payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
};


export const GetAllTheatresByMovie = async (payload) => {
    try {
        const response = await axiosInstance.post("api/shows/get-all-theatres-by-movie", payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
};

export const GetShowById = async (payload) => {
    try {
        const response = await axiosInstance.post("api/shows/get-show-by-id", payload);
        return response.data;
    } catch (error) {
        return error.message;
    }
}