import { Input } from "@/components/Auth/Input";
import { useCreateCourier } from "@/hooks/Dashboard/createCourier";
import { useStore } from "@/store/store";
import { useFormik } from "formik";
import toast from "react-hot-toast";

import * as Yup from "yup";

export const CreateCourier: React.FC = () => {
  const { user } = useStore((store) => store);
  const { addNewCourier } = useStore((store) => store.actions);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(5, "Must be 5 characters or more")
        .required("Required"),
      email: Yup.string()
        .email()
        .matches(/@[^.]*\./)
        .required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const name = values.name;
      const email = values.email;

      const type = "courier";
      const loading = toast.loading("Creating your courier");
      const data = await useCreateCourier(name, email, type, user?.teamID);

      toast.dismiss(loading);
      if (data.success) {
        const responseData = data.data;
        const newCourier = {
          email: responseData.email,
          id: responseData.id,
          name: responseData.name,
          teamid: responseData.teamid,
          trips: responseData.trips,
          type: responseData.type,
          userid: responseData.userid,
        };
        addNewCourier(newCourier);
        toast.success("Successfully Created Courier");
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
        <h1 className="text-center font-bold text-5xl text-slate-950">
          Create a Courier
        </h1>
      </div>
      <Input
        id="name"
        name="name"
        placeholder="Enter your name"
        formik={formik}
      />
      <Input
        id="email"
        name="email"
        placeholder="Enter Email Address"
        formik={formik}
      />
      <button
        type="submit"
        className="w-2/4 p-5 bg-[#f4c211] text-white rounded-xl cursor-pointer"
      >
        <p className="text-black font-bold">Submit</p>
      </button>
    </form>
  );
};
