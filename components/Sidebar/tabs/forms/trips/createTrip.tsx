import { Input } from "@/components/Auth/Input";
import { Select } from "@/components/Auth/Select";
import { useAddTripToCourier } from "@/hooks/Dashboard/addTripToCourier";
import { useCreateTrip } from "@/hooks/Dashboard/createTrip";
import { useGetRoute } from "@/hooks/Dashboard/getRoute";
import { useStore } from "@/store/store";
import { generateEstimatedRoute } from "@/utils/Map/generateEstimatedRoute";
import { useFormik } from "formik";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
const AddressSearch = dynamic(() => import("../../../../AddressSearch/index"), {
  ssr: false,
});

export const CreateTrip: React.FC = () => {
  const { team, layers } = useStore((store) => store);
  const { addNewLayer, removeLayer, updateModal, resetModal } = useStore(
    (store) => store.actions
  );

  const formik = useFormik({
    initialValues: {
      start: [],
      end: [],
      assignee: "",
      tripname: "",
      start_name: "",
      end_name: "",
      vehicle: "",
      team_id: team.id,
    },
    validationSchema: Yup.object({
      start: Yup.array().length(2).required("Please enter your start location"),
      end: Yup.array().length(2).required("Please enter your start location"),
      assignee: Yup.string().required("Required"),
      tripname: Yup.string().required("Required"),
      start_name: Yup.string().required("Required"),
      end_name: Yup.string().required("Required"),
      vehicle: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const {
        start,
        end,
        assignee,
        tripname,
        start_name,
        end_name,
        vehicle,
        team_id,
      } = values;
      const loading = toast.loading("Creating your trip");
      const data = await useCreateTrip(
        start,
        end,
        assignee,
        tripname,
        start_name,
        end_name,
        vehicle,
        team_id
      );

      toast.dismiss(loading);
      if (data.success) {
        toast.success(`Trip Created Successfully`);
        removeLayer("estimated_route");
        removeLayer("icon_layer_start");
        removeLayer("icon_layer_end");
        resetForm();
        resetModal();
      }
      if (data.error) {
        toast.error(data.error.response.data.errors);
      }
    },
  });
  useEffect(() => {
    const getRoute: any = async () => {
      const data = await useGetRoute(
        formik.values.start[0],
        formik.values.start[1],
        formik.values.end[0],
        formik.values.end[1]
      );

      if (data.success) {
        const routes = data.data.routes;
        updateModal(true, routes[0].distance, routes[0].duration);
        const layer = generateEstimatedRoute(routes);
        addNewLayer(layer);
      }
    };

    if (formik.values.start.length != 0 && formik.values.end.length != 0) {
      getRoute();
    }
  }, [formik.values]);
  return (
    <form
      className="w-full h-full flex flex-col justify-start items-center gap-10 "
      onSubmit={formik.handleSubmit}
    >
      <div className="flex justify-center items-center flex-col gap-3">
        <h1 className="text-center font-bold text-3xl text-slate-950">
          Create Trip
        </h1>
      </div>
      <AddressSearch formik={formik} fieldValue="start" />
      <AddressSearch formik={formik} fieldValue="end" />
      <Select
        id="assignee"
        name="assignee"
        placeholder="Select Courier"
        formik={formik}
      >
        <option> Please select a courier</option>
        {team.couriers.map((map) => (
          <option value={map.userid}> {map.name}</option>
        ))}
      </Select>
      <Input
        id="tripname"
        name="tripname"
        placeholder="Enter your trip name"
        formik={formik}
      />
      <Input
        id="start_name"
        name="start_name"
        placeholder="Enter the name of your start location"
        formik={formik}
      />
      <Input
        id="end_name"
        name="end_name"
        placeholder="Enter the name of your end location"
        formik={formik}
      />
      <Select
        id="vehicle"
        name="vehicle"
        placeholder="Select Vehicle"
        formik={formik}
      >
        <option> Please select a vehicle</option>
        <option value={"Lorry"}> Lorry</option>
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
