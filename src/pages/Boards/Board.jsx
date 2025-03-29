import Container from '@mui/material/Container'
import { AppBar } from '~/components/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { useEffect, useState } from 'react'
import { fetchBoardDetailsApi, updateBoardDetailsApi, createNewCardApi, createNewColumnApi, moveCardToDifferentColumnApi } from '~/apis'
import { generatePlaceHolderCard } from '~/utils/formatter'
import { isEmpty } from 'lodash'

import mapOrder from '~/utils/sortter.js'
import { Box, CircularProgress } from '@mui/material'


function Board() {
    const [board, setBoard] = useState(null)
    
    useEffect(() => {
        const boardId = '67e602c4a1646c22a8095493'

        fetchBoardDetailsApi(boardId).then((data) => {
            data.columns = mapOrder(data?.columns, data?.columnOrderIds, '_id')
            data.columns.forEach(column => {
                if (isEmpty(column.cards)) {
                    column.cards = [generatePlaceHolderCard(column)]
                    column.cardOrderIds = [generatePlaceHolderCard(column)._id]
                } else {
                    column.cards = mapOrder(column?.cards, column?.cardOrderIds, '_id')
                }
            })
            setBoard(data)
        })
    }, [])

    // CreateNewColumn
    const createNewColumn = async (newColumnData) => {
        const createdColumn = await createNewColumnApi({ ...newColumnData, boardId: board._id }) 
        createdColumn.cards = [generatePlaceHolderCard(createdColumn)]
        createdColumn.cardOrderIds = [generatePlaceHolderCard(createdColumn)._id]

        const newBoard = { ...board }

        newBoard.columns.push(createdColumn)
        newBoard.columnOrderIds.push(createdColumn._id)
        setBoard(newBoard)
    }

    // CreateNewCard
    const createNewCard = async (newCardData) => {
        const createNewCard = await createNewCardApi({ ...newCardData, boardId: board._id }) 
        
        const newBoard = { ...board }
        const columnToUpdate = newBoard.columns.find(column => column._id === createNewCard.columnId)
        if (columnToUpdate) {
            columnToUpdate.cards.push(createNewCard)
            columnToUpdate.cardOrderIds.push(createNewCard._id)
            setBoard(newBoard)
        }
    }

    const moveColumns = (dndOrderedColumns) => {
        const dndOrderedColumnsIds = dndOrderedColumns.map(column => column._id)

        const newBoard = { ...board }

        newBoard.columns = dndOrderedColumns
        newBoard.columnOrderIds = dndOrderedColumnsIds
        setBoard(newBoard)

        // Call Api update board
        updateBoardDetailsApi(newBoard._id, {
            columnOrderIds: dndOrderedColumnsIds
        })
    }

    const moveCardInTheSameColumn = (dndOrderedCard, dndOrderedCardIds, columnId) => {
        const newBoard = { ...board }
        const columnToUpdate = newBoard.columns.find(column => column._id === columnId)
        if (columnToUpdate) {
            columnToUpdate.cards = dndOrderedCard
            columnToUpdate.cardOrderIds = dndOrderedCardIds
            setBoard(newBoard)

            // updateColumnDetailsApi(columnId, {
            //     cardOrderIds: dndOrderedCardIds
            // })
        }
    }

    const moveCardToDifferentColumn = (currentCardId, oldColumnId, newColumnId, dndOrderedColumns) => {
        const dndOrderedColumnsIds = dndOrderedColumns.map(column => column._id)

        const newBoard = { ...board }

        newBoard.columns = dndOrderedColumns
        newBoard.columnOrderIds = dndOrderedColumnsIds
        setBoard(newBoard)

        moveCardToDifferentColumnApi({
            currentCardId,
            oldColumnId,
            oldCardOrderIds: dndOrderedColumns.find(column => column._id === oldColumnId)?.cardOrderIds,
            newColumnId,
            newCardOrderIds: dndOrderedColumns.find(column => column._id === newColumnId)?.cardOrderIds
        })
    }

    if (!board) {
        return (<Box sx={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            width: '100vw',
            gap: 2
        }}>
            <CircularProgress/>
        </Box>)
    }
    return (
        <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
            <AppBar />
            <BoardBar board={board}/>
            <BoardContent 
                board={board} 
                createNewColumn={createNewColumn} 
                createNewCard={createNewCard}
                moveColumns={moveColumns}
                moveCardInTheSameColumn={moveCardInTheSameColumn}
                moveCardToDifferentColumn={moveCardToDifferentColumn}
            />
        </Container>
    )
}

export default Board