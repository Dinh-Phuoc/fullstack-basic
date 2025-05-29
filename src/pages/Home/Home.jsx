import { Box, CircularProgress, Container } from '@mui/material'
import HomeBar from './HomeBar/HomeBar'
import Content from './Content/Content'
import Footer from './Footer/Footer'

export default function Home() {
    const isDarkLight = localStorage.getItem('mui-mode') && localStorage.removeItem('mui-mode')

    if (isDarkLight) {
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
        <Container disableGutters maxWidth={false}>
            <HomeBar />
            <Content/>
            <Footer/>
        </Container>
    )
}