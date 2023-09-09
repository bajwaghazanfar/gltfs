import axios from "axios";

export const getAllCouriers = async (): Promise<any> => {
  try {
    const apiResponse = await axios.get(
      "http://localhost:8080/dashboard/get-couriers",
      { withCredentials: true }
    );
    console.log(apiResponse);
    return {
      status: apiResponse.status,
      statusText: apiResponse.statusText,
      data: apiResponse.data,
      error: null,
      loading: false,
    };
  } catch (error) {
    return {
      error: error,
      status: 400,
      data: null,
      loading: false,
      statusText: "",
    };
  }
};
