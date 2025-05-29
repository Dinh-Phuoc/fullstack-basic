import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { isEmpty } from 'lodash'
import { v4 } from 'uuid'
import { createNewCardApi, createNewColumnApi, deleteColumnDetailsApi, fetchBoardDetailsApi } from '~/apis'
import { generatePlaceHolderCard } from '~/utils/formatter'
import mapOrder from '~/utils/sortter'

export const boardSilce = createSlice({
    name: 'board',
    initialState: {
        status: false,
        data: []
    },
    reducers: {
        addBoard: (state, action) => {
            state.data.push(action.payload)
        },
        updateBoard: (state, action) => {
            const boardUpdate = state.data.find( board => board.uuid === action.payload.boardUuid)
            boardUpdate.columns = action.payload.orderedColumns
            boardUpdate.columnOrderIds = action.payload.orderedColumnsIds
        },
        updateColumn: (state, action) => {
            const boardUpdate = state.data.find( board => board.uuid === action.payload.boardUuid)
            const columnUpdate = boardUpdate.columns.find( column => column.uuid === action.payload.columnUuid)
            columnUpdate.cards = action.payload.dndOrderedCard
            columnUpdate.cardOrderIds = action.payload.dndOrderedCardIds
        }
    },
    extraReducers: builder => {
        builder
            // Get Board
            .addCase(fetchBoard.pending, (state) => {
                state.status = false
            })
            .addCase(fetchBoard.fulfilled, (state, action) => {
                state.status = true
                state.data = [action.payload]
            })

            // Add Column to Board
            .addCase(addNewColumns.fulfilled, (state, action) => {
                const createdColumn = action.payload

                createdColumn.cards = [generatePlaceHolderCard(createdColumn)]
                createdColumn.cardOrderIds = [generatePlaceHolderCard(createdColumn).uuid]
                
                const boardUpdate = state.data.find( board => board.uuid === action.payload.boardUuid)
                if (boardUpdate) {
                    boardUpdate.columns.push(action.payload)
                    boardUpdate.columnOrderIds.push(action.payload.uuid)
                }
            })

            // Add Card to Column
            .addCase(addNewCards.fulfilled, (state, action) => {
                const createNewCard = action.payload.createNewCard
                const boardUpdate = state.data.find( board => board.uuid === createNewCard.boardUuid)
                const columnToUpdate = boardUpdate.columns.find(column => column.uuid === createNewCard.columnUuid)
                if (columnToUpdate) {
                    if (columnToUpdate.cards.some(card => card.FE_PlaceholderCard)) {
                        columnToUpdate.cards = [createNewCard]
                        columnToUpdate.cardOrderIds = [createNewCard.uuid]
                    } else {
                        columnToUpdate.cards.push(createNewCard)
                        columnToUpdate.cardOrderIds.push(createNewCard.uuid)
                    }
                }
            })

            // Delete Column
            .addCase(deleteColumn.fulfilled, (state, action) => {
                const boardUpdate = state.data.find( board => board.uuid === action.payload.newBoard.uuid)
                if (boardUpdate) {
                    Object.assign(boardUpdate, action.payload.newBoard)
                }
            })
    }
})

export const fetchBoard = createAsyncThunk('board/fetchBoard', async(boardUuid) => {
    const data = await fetchBoardDetailsApi(boardUuid)

    data.columns = mapOrder(data?.columns, data?.columnOrderIds, 'uuid')
    data.columns.forEach(column => {
        if (isEmpty(column.cards)) {
            column.cards = [generatePlaceHolderCard(column)]
            column.cardOrderIds = [generatePlaceHolderCard(column).uuid]
        } else {
            column.cards = mapOrder(column?.cards, column?.cardOrderIds, 'uuid')
        }
    })
    return data
})

export const addNewColumns = createAsyncThunk('board/addNewColumns', async(data) => {
    const createdColumn = await createNewColumnApi({ ...data, uuid: v4() }) 
    return createdColumn
})

export const addNewCards = createAsyncThunk('board/addNewCards', async(newCardData) => {
    const createNewCard = await createNewCardApi({ ...newCardData, uuid: v4() }) 
    return { createNewCard }
})

export const deleteColumn = createAsyncThunk('board/deleteColumn', async(columnUuid, { getState }) => {
    const { board } = getState()
    const newBoard = { ...board.data[0] }
    newBoard.columns = newBoard.columns.filter(column => column.uuid !== columnUuid)
    newBoard.columnOrderIds = newBoard.columnOrderIds.filter(uuid => uuid !== columnUuid)
    const message = await deleteColumnDetailsApi(columnUuid, newBoard)
    return { newBoard, message }
})