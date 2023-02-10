import axios from "axios";
import { WEATHERAPI_URL, WEATHERAPI_KEY } from "@env";

console.log(WEATHERAPI_URL, WEATHERAPI_KEY);

export const API = axios.create({
    baseURL: WEATHERAPI_URL,
    params: {
        key: WEATHERAPI_KEY,
    },
});
