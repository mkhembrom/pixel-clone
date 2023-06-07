import axios from "axios";

export const Axios = axios.create({
    baseURL: 'https://api.pexels.com',
    headers: {
        'Authorization': 'Dj9GS3CoBcYyIYvz3Pnpx34znvzH9R98OnCnnmhEovKYnaM96U8MvqhB'
    }
});

export const authAxios = axios.create({
    baseURL: process.env.REACT_APP_API_CLIENT,
    withCredentials: true
})