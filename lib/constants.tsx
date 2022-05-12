import axios from "axios";

const client = axios.create({
    baseURL: process.env.API_URI
});

const truncate = (str: any, n: number) => {
    return (str) ? str.substr(0, n - 1) + '...' : '';
};

const offset = 10;
const datatype = "json";


export default { client, truncate, offset ,datatype};




