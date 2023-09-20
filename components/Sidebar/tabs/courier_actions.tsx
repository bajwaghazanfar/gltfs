import { Input } from "@/components/Auth/Input";
import { useCreateCourier } from "@/hooks/Dashboard/createCourier";
import { useStore } from "@/store/store";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useFormik } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { CreateCourier } from "./forms/courier/createCourier";
type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export const CourierActions: React.FC<Props> = ({ open, setOpen }) => {
  const [actionType, setActionType] = useState<string>("");

  return (
    <div>
      <AnimatePresence>
        {open && (
          <motion.div
            className="w-[400px] h-screen flex flex-col justify-start items-start "
            initial={{ left: "-200px", opacity: 0 }}
            animate={{ left: "0px", opacity: 1 }}
            exit={{ left: "30px", opacity: 0 }}
          >
            <div className="w-full h-full p-5">
              <div className="w-full h-[100px] ">
                <button
                  className="w-auto bg-white outline-none p-3 rounded-lg shadow-2xl"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <ArrowLeftIcon className="h-6 w-6 text-slate-800 " />
                </button>
              </div>

              <div className="w-[500px] h-[90%] bg-white flex flex-col justify-start items-start rounded-lg shadow-2xl p-2 gap-3">
                <select
                  className="w-full h-auto bg-slate-100 p-2 rounded-l  outline-none"
                  onChange={(e) => {
                    setActionType(e.target.value);
                  }}
                >
                  <option>Select Action Type</option>
                  <option value="create">Create Courier</option>
                  <option value="delete">Delete Courier</option>
                </select>
                {actionType === "create" ? <CreateCourier /> : ""}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
