import request from '../utils/request';

const path = "pronunciation"

export const storeExam = async (params) => {
    const response = await request.post(`${path}/store`, params)
    return response;
}

export const getAllExam = async () => {
    const response = await request.get(`${path}/index`)
    return response;
}

export const getByIdExam = async (id) => {
    const response = await request.get(`${path}/get-by-id/${id}`)
    return response;
}