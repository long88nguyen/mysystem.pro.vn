import request from '../utils/request';

export const login = async (params) => {
    const response = await request.post(`login`, params)
    return response;
}

export const logout = async () => {
    const response = await request.post('logout')
    return response
}
