import http from  './http'

export const getIndex = params => { return http.get('/index/', {params})};
export const goRegister = params => { return http.post('/users/register', params)};
export const goLogin = params => { return http.post('/users/login', params)};

