import axios from "axios";

export const useCreateCourier = async (
  name: string,
  email: string,
  type: string,
  teamID: number | undefined
): Promise<any> => {
  try {
    const apiResponse = await axios.post(
      "http://localhost:8080/dashboard/add-courier",
      { name, email, type, teamID },
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
