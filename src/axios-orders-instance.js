import axios from 'axios';

const axiosInstance = axios.create({
    baseURL : 'https://react-burger-builder-be.firebaseio.com/'
})

export default axiosInstance;

