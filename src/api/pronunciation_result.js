import request from '../utils/request';

const path = "pronunciation-result"

export const storePronoun = async (params) => {
    const response = await request.post(`${path}/store`, params)
    return response;
}
