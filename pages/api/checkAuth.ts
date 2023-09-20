// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { User } from "@/types/user";
import * as cookie from "cookie";
import jwt_decode from "jwt-decode";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  user: User | null;
  error: string | null;
  success: boolean;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.headers.cookie != undefined || req.headers.cookie != null) {
    const { token } = cookie.parse(req.headers.cookie);
    const decoded: User = jwt_decode(token);
    res.status(200).json({ user: decoded, success: true, error: null });
  } else {
    res
      .status(200)
      .json({ user: null, success: false, error: "No cookie provided" });
  }
}
