import request from '../utils/request';

const path = "message"

export const getAllMessage = async () => {
    const response = await request.get(`${path}`)
    return response;
}

export const storeMessage = async (params) => {
    const response = await request.post(`${path}`, params)
    return response
}
