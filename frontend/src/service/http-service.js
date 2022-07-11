import axios from "axios";

const instance = axios.create({
    baseURL: '/',
    //timeout: 1000,
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    let token = localStorage.getItem('_act');
    if(token){
        config.headers['X-Access-Token'] = token;
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    // Do something with the response
    return response;
}, function (error) {
    // Do something with request error
    if(error.response.status == 401){
        localStorage.removeItem('_act');
        window.location.href = '/';
    }
    return Promise.reject(error);
});


export default instance;