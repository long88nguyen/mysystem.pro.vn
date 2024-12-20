import request from '../utils/request';

const path = "chat-message"

export const storeMessageText = async (params) => {
    const response = await request.post(`${path}/store-text`, params)
    return response;
}
