import request from '../utils/request';

const path = "pronunciation"

export const sendNotification = async (params) => {
    const response = await request.post(`send-notification`, params)
    return response;
}

export const getNotification = async (params) => {
    const response = await request.get(`get-message`)
    return response;
}