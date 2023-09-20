import { MAPBOX_ACCESS_TOKEN } from "@/constants/MapBoxAccessToken";
import axios from "axios";

export const useGetRoute = async (
  start_longitude: number,
  start_latitude: number,
  end_longitude: number,
  end_latitude: number
): Promise<any> => {
  try {
    const apiResponse = await axios.get(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${start_longitude},${start_latitude};${end_longitude},${end_latitude}?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=${MAPBOX_ACCESS_TOKEN}`
    );

    return {
      success: true,
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
