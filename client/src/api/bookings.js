import { axiosInstance } from "./index";

export const seatBooking = async (payload) =>{
    try{
        const response = await axiosInstance.post("/api/bookings/seat-booking", payload);
        console.log(response.data);
        return response.data;
    }
    catch(error){
        return error.response;
    }
}