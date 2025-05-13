import Container from '@mui/material/Container'
import { AppBar } from '~/components/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { useEffect } from 'react'

import { Box, CircularProgress } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { boardSelector } from '~/redux/selector'
import { fetchBoard } from '~/redux/slice/boardSlice'

function Board() {
    const dispatch = useDispatch()
    const { status, data } = useSelector(boardSelector)
    
    useEffect(() => {
        dispatch(fetchBoard())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const board = data[0]

    if (!status) {
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
            />
        </Container>
    )
}

export default Board