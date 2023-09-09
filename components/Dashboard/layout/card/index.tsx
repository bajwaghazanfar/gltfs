import React from "react";

import { BiSolidTruck } from "react-icons/bi";

type Props = {
  bg: string;
  number: number | string;
  title: string;
  icon: JSX.Element;
};
export const Card: React.FC<Props> = ({ bg, number, title, icon }) => {
  return (
    <div
      className={`w-[220px] h-[220px] ${bg} rounded-xl shadow-xl p-3 flex flex-col gap-5 `}
    >
      <div className="w-full h-1/3 flex justify-end place-items-end">
        {icon}
      </div>
      <div className="w-full h-2/3 flex flex-col justify-end ">
        <h2 className="text-white font-semibold text-4xl">{number}</h2>
        <p className="text-gray-300 font-normal text-xl">{title}</p>
      </div>
    </div>
  );
};
