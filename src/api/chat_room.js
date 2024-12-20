import request from '../utils/request';

const path = "chat-room"

export const getListChatRoom = async () => {
    const response = await request.get(`${path}/index`)
    return response;
}

export const storeChatRoom = async (params) => {
    const response = await request.post(`${path}/store`, params)
    return response
}

export const getChatRoomById = async (id) => {
    const response = await request.get(`${path}/get-by-id/${id}`)
    return response
}
