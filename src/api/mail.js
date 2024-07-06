import request from '../utils/request';

const path = "send-mail"

export const sendMail = async (params) => {
    const response = await request.post(`${path}`, params)
    return response;
}