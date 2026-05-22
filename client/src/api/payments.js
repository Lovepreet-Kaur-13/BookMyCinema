import { axiosInstance } from ".";

export const MakePayment = async ({ amount, description, userId}) => {
  try {
    const response = await axiosInstance.post("/api/payments/make-payment", { amount, description, userId });
    console.log(response);
    return response.data;

  } catch (err) {
    return err.response;
  }
};