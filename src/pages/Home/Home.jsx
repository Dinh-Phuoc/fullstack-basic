import { Container, useColorScheme } from '@mui/material'
import HomeBar from './HomeBar/HomeBar'
import Content from './Content/Content'
import Footer from './Footer/Footer'
import { useEffect } from 'react'

export default function Home() {
    const { setMode } = useColorScheme()

    useEffect(() => {
        setMode('light')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Container disableGutters maxWidth={false}>
            <HomeBar />
            <Content/>
            <Footer/>
        </Container>
    )
}