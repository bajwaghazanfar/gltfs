import axios from "axios";

export const useAddTripToCourier = async (
  userID: string,
  tripID: string
): Promise<any> => {
  try {
    const apiResponse = await axios.post(
      "http://localhost:8080/dashboard/assign-trip",
      { userID, tripID },
      { withCredentials: true }
    );

    return {
      success: apiResponse.data.success,
      data: apiResponse.data,
      error: apiResponse.data.errors,
      loading: false,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: error,
      loading: false,
    };
  }
};
