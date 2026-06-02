import {axiosInstance} from './index';

export const RegisterUser = async (value) =>{
    try{
        const response = await axiosInstance.post("api/users/register", value);
        return response.data;
    }
    catch(error){
        console.log(error);
    }

}

export const LoginUser = async(value) =>{
    try{
        const response = await axiosInstance.post("api/users/login", value);
        return response.data;
    }
    catch(error){
        console.log(error);
        return error.response.data;
    }
}

export const GetCurrentUser = async () =>{
    try{
        const response = await axiosInstance.get("/api/users/get-current-user");
        return response.data;
    }
    catch(error){
        console.log(error);
    }
}

export const ForgotPasswrd = async (values) => {
  console.log("Forgot password API called");
  try {
    const response = await axiosInstance.post("/api/users/forgot-password", values);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const ResetPasswrd = async (values) => {
  try {
    const response = await axiosInstance.post("/api/users/reset-password", values);
    return response.data;
  } catch (error) {
    return error;
  }
};

