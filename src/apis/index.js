import axios from 'axios'
import { API_ROOT } from '~/utils/constant'

// Call Api BoardModel
export const fetchBoardDetailsApi = async (boardId) => {
    const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
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