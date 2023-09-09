import axios from "axios";

export const useCreateUser = async (
  name: string,
  email: string,
  password: string,
  type: string
): Promise<any> => {
  try {
    const apiResponse = await axios.post(
      "http://localhost:8080/auth/signup",
      { name, email, password, type },
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
