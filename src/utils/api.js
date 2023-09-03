import axios from "axios";

let token = localStorage.getItem("token");

export async function fetchData(endpoint, queryParameters, isProtected = false) {
    try {
        let config = isProtected ? { headers: { Authorization: `Bearer ${token}` } } : {};
        let params = queryParameters ? { params: queryParameters } : {};
        const response = await axios.get(`${process.env.REACT_APP_API_DOMAIN}${endpoint}`, { ...config, ...params });
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function deleteData(endpoint, isProtected = false) {
    try {
        let config = isProtected ? { headers: { Authorization: `Bearer ${token}` } } : {};
        const response = await axios.delete(`${process.env.REACT_APP_API_DOMAIN}${endpoint}`, config);
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
    }
}

export async function postData(endpoint, data, queryParameters, isProtected = false) {
    try {
        let config = isProtected ? { headers: { Authorization: `Bearer ${token}` } } : {};
        let params = queryParameters ? { params: queryParameters } : {};
        const response = await axios.post(`${process.env.REACT_APP_API_DOMAIN}${endpoint}`, data, { ...config, ...params });
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
    }
}