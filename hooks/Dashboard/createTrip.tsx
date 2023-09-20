import axios from "axios";

export const useCreateTrip = async (
  start: Array<number>,
  end: Array<number>,
  asignee: string,
  tripname: string,
  start_name: string,
  end_name: string,
  vehicle: string,
  team_id: number
): Promise<any> => {
  try {
    const apiResponse = await axios.post(
      "http://localhost:8080/dashboard/create-trip",
      {
        start,
        end,
        asignee,
        tripname,
        start_name,
        end_name,
        vehicle,
        team_id,
      },
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
