import { Select } from "@/components/Auth/Select";
import { useAddTripToCourier } from "@/hooks/Dashboard/addTripToCourier";
import { useStore } from "@/store/store";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";

export const AssignTrip: React.FC = () => {
  const { team } = useStore((store) => store);

  const formik = useFormik({
    initialValues: {
      tripID: "",
      userID: "",
    },
    validationSchema: Yup.object({
      tripID: Yup.string().required("Required"),
      userID: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const tripID = values.tripID;
      const userID = values.userID;

      const loading = toast.loading("Creating your courier");
      const data = await useAddTripToCourier(userID, tripID);

      toast.dismiss(loading);
      if (data.success) {
        const responseData = data.data;

        toast.success(`Successfully Added Trip:${tripID} to user ${userID}`);
        resetForm();
      }
      if (data.error) {
        toast.error(data.error.response.data.errors);
      }
    },
  });

  return (
    <form
      className="w-full h-full flex flex-col justify-start items-center gap-10 "
      onSubmit={formik.handleSubmit}
    >
      <div className="flex justify-center items-center flex-col gap-3">
        <h1 className="text-center font-bold text-3xl text-slate-950">
          Assign Trip to Courier
        </h1>
      </div>
      <Select
        id="tripID"
        name="tripID"
        placeholder="Select Trip"
        formik={formik}
      >
        <option> Please select a trip</option>
        {team.trips.map((map) => (
          <option value={map.trip_id}> {map.tripname}</option>
        ))}
      </Select>
      <Select
        id="userID"
        name="userID"
        placeholder="Select Courier"
        formik={formik}
      >
        <option> Please select a courier</option>
        {team.couriers.map((map) => (
          <option value={map.userid}> {map.name}</option>
        ))}
      </Select>
      <button
        type="submit"
        className="w-2/4 p-5 bg-[#f4c211] text-white rounded-xl cursor-pointer"
      >
        <p className="text-black font-bold">Submit</p>
      </button>
    </form>
  );
};
