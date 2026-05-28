import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

export const getTodos = (page=1, limit=5, search="") =>
    api.get(
        `/todos?page=${page}&limit=${limit}&search=${search}`
    );
    

export default api;