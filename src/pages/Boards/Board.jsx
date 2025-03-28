import Container from '@mui/material/Container'
import { AppBar } from '~/components/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { useEffect, useState } from 'react'
import { fetchBoardDetailsApi, createNewCardApi, createNewColumnApi } from '~/apis'
import { generatePlaceHolderCard } from '~/utils/formatter'
import { isEmpty } from 'lodash'

function Board() {
    const [board, setBoard] = useState(null)
    
    useEffect(() => {
        const boardId = '67e602c4a1646c22a8095493'

        fetchBoardDetailsApi(boardId).then((data) => {
            if (data.columns.length > 0) {
                data.columns.forEach(column => {
                    if (isEmpty(column.cards)) {
                        column.cards = [generatePlaceHolderCard(column)]
                        column.cardOrderIds = [generatePlaceHolderCard(column)._id]
                    }
                })
            }
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
    return (
        <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
            <AppBar />
            <BoardBar board={board}/>
            <BoardContent board={board} createNewColumn={createNewColumn} createNewCard={createNewCard}/>
        </Container>
    )
}

export default Board