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

export const GetAllBookings = async (userId) => {
  try {
    const response = await axiosInstance.post("/api/bookings/get-all-bookings", {userId});
    return response.data;
  } catch (err) {
    return err.response;
  }
};