import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Input } from "@/components/Auth/Input";
import { useCreateUser } from "@/hooks/Login/useCreateUser";

const Signup: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(5, "Must be 5 characters or more")
        .required("Required"),
      email: Yup.string()
        .email()
        .matches(/@[^.]*\./)
        .required("Required"),
      password: Yup.string()
        .min(5, "Must be 5 characters or more")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      const name = values.name;
      const email = values.email;
      const password = values.password;
      const type = "admin";
      const loading = toast.loading("Logging you in!");
      const data = await useCreateUser(name, email, password, type);
      toast.dismiss(loading);
      if (data.success) {
        toast.success("Successfully logged in!");
      }
      if (data.error) {
        toast.error(data.error);
      }
    },
  });
  //   const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //     event.preventDefault();

  //     const loading = toast.loading("Logging you in!");
  //     const data = await useLoginUser(email, password);
  //     toast.dismiss(loading);
  //     if (data.success) {
  //       toast.success("Successfully logged in!");
  //     }
  //     if (data.error) {
  //       toast.error(data.error);
  //     }
  //   };

  return (
    <div className="w-full h-screen bg-gradient-to-r from-rose-100 to-teal-100 flex justify-center items-center">
      <div className="w-full h-full flex justify-center items-center ">
        <div className="w-3/4 h-1/2   flex flex-col items-center justify-center p-8 bg-stone-50 rounded-xl shadow-2xl gap-4 2xl:w-1/2">
          <div className="flex justify-center items-center flex-col gap-3">
            <h1 className="text-center font-bold text-5xl text-slate-950">
              Signup
            </h1>
            <p className="text-center font-light text-xl flex gap-2 m-0">
              Already have an account?
            </p>
            <a className="text-sky-700 font-bold underline cursor-pointer m-0 ">
              Log in
            </a>
          </div>
          <form
            className="w-full h-full flex flex-col justify-center items-center gap-5 "
            onSubmit={formik.handleSubmit}
          >
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
            <Input
              id="password"
              name="password"
              placeholder="Enter Password"
              formik={formik}
            />
            <button
              type="submit"
              className="w-2/4 p-5 bg-sky-500 text-white rounded-xl cursor-pointer"
            >
              <p className="text-white font-bold">Submit</p>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Signup;
