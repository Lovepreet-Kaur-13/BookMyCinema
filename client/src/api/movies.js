import { axiosInstance } from "./index";

// GET ALL MOVIES

export const GetAllMovies = async () =>{
    try{
        const response = await axiosInstance.get("api/movies/get-all-movies");
        return response.data;
    }
    catch(error){
        console.log(error);
    }
}

// ADD MOVIE

export const AddMovie = async (values) =>{
    try{
        const response = await axiosInstance.post("api/movies/add-movie", values);
        return response.data;
    }
    catch(error){
        console.log(error);
    }
}

// UPDATE MOVIE

export const UpdateMovie = async (payload) =>{
    try{
        const response = await axiosInstance.put(`api/movies/update-movie/${payload.movieId}`, payload);
        return response.data;
    }
    catch(error){
        console.log(error);
    }
}

// DELETE MOVIE

export const DeleteMovie = async (movieId) =>{
    try{
        const response = await axiosInstance.delete(`api/movies/delete-movie/${movieID}`);
        return response.data;
    }
    catch(error){
        console.log(error);
    }
}