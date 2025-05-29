import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'


import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { boardSelector } from '~/redux/selector'
import { fetchBoard } from '~/redux/slice/boardSlice'
import { setUserInfoThunk } from '~/redux/slice/userSlice'

function Board() {
    const { status, data } = useSelector(boardSelector)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(setUserInfoThunk())
            .unwrap()
            .then(data => dispatch(fetchBoard(data.boardUuid[0])))
            
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