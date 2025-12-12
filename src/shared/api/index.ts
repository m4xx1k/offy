import axios from "axios";
import qs from "qs";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL!,
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
});
