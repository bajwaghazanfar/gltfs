import { InitialState } from "@/types/user";
import axios from "axios";

export type Props = {
  setState: any;
  initialState: InitialState;
};
export const getTeam: Props = async (setState, initialState: Props) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/dashboard/get-team",
      { id: 11 },
      { withCredentials: true }
    );

    setState({
      team: response.data.data,
      activeUsers: initialState.activeUsers + 1,
    });
  } catch (error) {
    console.error(error);
  }
};
