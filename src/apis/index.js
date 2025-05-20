import { API_ROOT } from '~/utils/constant'
import { AUTH_ROOT } from '~/utils/constant'
import instance from './interceptors'

// Call Api BoardModel
export const fetchBoardDetailsApi = async (boardUuid) => {
    const response = await instance.get(`${API_ROOT}/v1/boards/${boardUuid}`)
    return response.data
}

// Call Api Update Board
export const updateBoardDetailsApi = async (boardUuid, updateData) => {
    const response = await instance.put(`${API_ROOT}/v1/boards/${boardUuid}`, updateData)
    return response.data
}

// Call Api Update Column
export const updateColumnDetailsApi = async (columnId, updateData) => {
    const response = await instance.put(`${API_ROOT}/v1/columns/${columnId}`, updateData)
    return response.data
}

// Call Api Delete Column
export const deleteColumnDetailsApi = async (columnUuid, updateData) => {
    const response = await instance.delete(`${API_ROOT}/v1/columns/${columnUuid}`, updateData)
    return response.data
}

//moveCardToDifferentColumn
export const moveCardToDifferentColumnApi = async (updateData) => {
    const response = await instance.put(`${API_ROOT}/v1/boards/supports/moving_cards`, updateData)
    return response.data
}

// Call Api CardModel
export const createNewCardApi = async (newCardData) => {
    const response = await instance.post(`${API_ROOT}/v1/cards`, newCardData)
    return response.data
}

// Call Api ColumnModel
export const createNewColumnApi = async (newColumnData) => {
    const response = await instance.post(`${API_ROOT}/v1/columns`, newColumnData)
    return response.data
}
// Call Api for Login
export const loginApi = async (infoAccount) => {
    const response = await instance.post(`${AUTH_ROOT}/auth/login`, infoAccount)
    return response.data
}

export const refreshApi = async () => {
    const response = await instance.post(`${AUTH_ROOT}/auth/refresh`)
    return response.data
}

// Call Api for Logout
export const logoutApi = async () => {
    const response = await instance.delete(`${AUTH_ROOT}/auth/logout`)
    return response
}

// Call Api for register
export const registerApi = async (infoAccount) => {
    const response = await instance.post(`${AUTH_ROOT}/auth/register`, infoAccount)
    return response.data
}

// Call the Api to get the User's information
export const getInforUserApi = async () => {
    const response = await instance.get(`${API_ROOT}/v1/manage/users/profile`)
    return response.data
}
// Call Api for upload Image
export const uploadImageHeaderApi = async (file) => {
    const response = await instance.patch(`${API_ROOT}/v1/manage/users/profile/upload/image-header`, file, {
        headers: {
            'Content-Type': 'multipart/form-data',
            withCredentials: true
        }
    })
    return response.data
}

export const uploadAvatarApi = async (file) => {
    const response = await instance.patch(`${API_ROOT}/v1/manage/users/profile/upload/avatar`, file, {
        headers: {
            'Content-Type': 'multipart/form-data',
            withCredentials: true
        }
    })
    return response.data
}

// Call Api for get Image
export const getImageHeaderApi = async (userId) => {
    const response = await instance.get(`${API_ROOT}/v1/manage/users/profile/get-image/image-header/${userId}`)
    return response.data
}

export const getAvatarApi = async (userId) => {
    const response = await instance.get(`${API_ROOT}/v1/manage/users/profile/get-image/avatar/${userId}`)
    return response.data
}

// Call Api for update profile
export const updateProfileApi = async (userId, fieldName, data) => {
    const response = await instance.patch(`${API_ROOT}/v1/manage/users/profile/update/${userId}/${fieldName}`, { data })
    return response.data
}

export const updatePasswordApi = async (userId, fieldName, data) => {
    const response = await instance.patch(`${API_ROOT}/v1/manage/users/profile/update/${userId}/${fieldName}`, data)
    return response.data
}

