import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLoginUser } from "@/hooks/Login/useLoginUser";
import { getAllCouriers } from "@/hooks/Dashboard/getAllUsers";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useStore } from "@/store/store";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(true);
  const router = useRouter();
  const { loginUser } = useStore((store) => store.actions);
  useEffect(() => {
    if (email != "" && password != "") {
      setDisabled(!disabled);
    }
  }, [email, password]);
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const loading = toast.loading("Logging you in!");
    const data = await useLoginUser(email, password);
    toast.dismiss(loading);
    if (data.success) {
      toast.success("Successfully logged in!");
      loginUser();
      // router.push("/dashboard/admin");
    }
    if (data.error) {
      toast.error(data.error);
    }
  };
  useEffect(() => {
    getAllCouriers();
  }, []);

  return (
    <div className="w-full h-screen bg-gradient-to-r from-rose-100 to-teal-100 flex justify-center items-center">
      <div className="w-full h-full flex justify-center items-center ">
        <div className="w-3/4 h-1/2   flex flex-col items-center justify-center p-8 bg-stone-50 rounded-xl shadow-2xl gap-4 2xl:w-1/2">
          <form
            className="w-full h-full flex flex-col justify-center items-center gap-10 "
            onSubmit={handleFormSubmit}
          >
            <div className="flex justify-center items-center flex-col gap-3">
              <h1 className="text-center font-bold text-5xl text-slate-950">
                Login
              </h1>
              <p className="text-center font-light text-xl flex gap-2 m-0">
                Already have an account?
              </p>
              <a className="text-sky-700 font-bold underline cursor-pointer m-0 ">
                Sign in
              </a>
            </div>
            <input
              placeholder="Enter Email Address"
              className="w-3/4 h-10 bg-stone-200 rounded-xl p-2 placeholder:text-stone-500"
              onChange={handleEmailChange}
            />
            <input
              placeholder="Enter Password"
              className="w-3/4 h-10 bg-stone-200 rounded-xl p-2 placeholder:text-stone-500"
              onChange={handlePasswordChange}
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
export default Login;
