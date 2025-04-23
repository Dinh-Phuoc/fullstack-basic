import axios from 'axios'
import { API_ROOT } from '~/utils/constant'

// Call Api BoardModel
export const fetchBoardDetailsApi = async (boardId) => {
    const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
    return response.data
}

// Call Api Update Board
export const updateBoardDetailsApi = async (boardId, updateData) => {
    const response = await axios.put(`${API_ROOT}/v1/boards/${boardId}`, updateData)
    return response.data
}

// Call Api Update Column
export const updateColumnDetailsApi = async (columnId, updateData) => {
    const response = await axios.put(`${API_ROOT}/v1/columns/${columnId}`, updateData)
    return response.data
}

// Call Api Delete Column
export const deleteColumnDetailsApi = async (columnId, updateData) => {
    const response = await axios.delete(`${API_ROOT}/v1/columns/${columnId}`, updateData)
    return response.data
}

//moveCardToDifferentColumn
export const moveCardToDifferentColumnApi = async (updateData) => {
    const response = await axios.put(`${API_ROOT}/v1/boards/supports/moving_cards`, updateData)
    return response.data
}

// Call Api CardModel
export const createNewCardApi = async (newCardData) => {
    const response = await axios.post(`${API_ROOT}/v1/cards`, newCardData)
    return response.data
}

// Call Api ColumnModel
export const createNewColumnApi = async (newColumnData) => {
    const response = await axios.post(`${API_ROOT}/v1/columns`, newColumnData)
    return response.data
}
// Call Api for Login
export const loginApi = async (infoAccount) => {
    const response = await axios.post(`${API_ROOT}/v1/manage/users/login`, infoAccount)
    return response.data
}

// Call Api for Login
export const registerApi = async (infoAccount) => {
    const response = await axios.post(`${API_ROOT}/v1/manage/users/register`, infoAccount)
    return response.data
}

// Call the Api to get the User's information
export const getInforUserApi = async () => {
    const response = await axios.get(`${API_ROOT}/v1/manage/users/profile`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    return response.data
}
// Call Api for upload Image
export const uploadImageHeaderApi = async (file, userId) => {
    const response = await axios.patch(`${API_ROOT}/v1/manage/users/profile/upload/image-header/${userId}`, file)
    return response.data
}

export const uploadAvatarApi = async (file, userId) => {
    const response = await axios.patch(`${API_ROOT}/v1/manage/users/profile/upload/avatar/${userId}`, file, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
        }
    })
    return response.data
}

// Call Api for get Image
export const getImageHeaderApi = async (userId) => {
    const response = await axios.get(`${API_ROOT}/v1/manage/users/profile/get-image/image-header/${userId}`)
    return response.data
}

export const getAvatarApi = async (userId) => {
    const response = await axios.get(`${API_ROOT}/v1/manage/users/profile/get-image/avatar/${userId}`)
    return response.data
}

// Call Api for update profile
export const updateProfileApi = async (userId, fieldName, data) => {
    const response = await axios.patch(`${API_ROOT}/v1/manage/users/profile/update/${userId}/${fieldName}`, { data }, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    return response
}
