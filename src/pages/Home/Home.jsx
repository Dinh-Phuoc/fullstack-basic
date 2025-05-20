import { Container } from '@mui/material'
import HomeBar from './HomeBar/HomeBar'
import Content from './Content/Content'

export default function Home() {
    return (
        <Container disableGutters maxWidth={false}>
            <HomeBar />
            <Content/>
        </Container>
    )
}