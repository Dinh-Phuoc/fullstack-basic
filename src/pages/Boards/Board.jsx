import Container from '@mui/material/Container'
import { AppBar } from '~/components/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { useEffect, useState } from 'react'
import { fetchBoardDetailsApi } from '~/apis'

function Board() {
    const [board, setBoard] = useState(null)

    useEffect(() => {
        const boardId = '67e511d38b3d48b3ac10bc37'

        fetchBoardDetailsApi(boardId).then((data) => {
            setBoard(data)
        })
    }, [])
    return (
        <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
            <AppBar />
            <BoardBar board={board}/>
            <BoardContent board={board}/>
        </Container>
    )
}

export default Board