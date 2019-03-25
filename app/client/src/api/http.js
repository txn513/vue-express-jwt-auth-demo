import axios from 'axios'
import router from '../router'

const service = axios.create({
    baseURL: process.env.API_ROOT, 
    timeout: 5000
});

service.interceptors.request.use(request => {
    const token = localStorage.getItem('token');
    if (token) {
        request.headers['Authorization'] = `Bearer ${token}`
    }
    return request;
});
  
service.interceptors.response.use(
    response => {
        if (response.data.token) {
            console.log('token:', response.data.token);
            localStorage.setItem('token', response.data.token);
        }
        return response;
    },
    error => {
        const errRes = error.response;
        if (errRes.status === 401) {
            localStorage.removeItem('token');
            router.push('/login')
        }
    return Promise.reject(error.message); 
});
  

export default service;