import axios from "axios";

export const API = axios.create({
    baseURL: `https://dog.ceo/api/`,
});
