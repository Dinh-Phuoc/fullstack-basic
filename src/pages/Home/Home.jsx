import { Container } from '@mui/material'
import HomeBar from './HomeBar/HomeBar'
import Content from './Content/Content'
import Footer from './Footer/Footer'

export default function Home() {
    return (
        <Container disableGutters maxWidth={false}>
            <HomeBar />
            <Content/>
            <Footer/>
        </Container>
    )
}