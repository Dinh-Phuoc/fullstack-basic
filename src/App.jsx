import { Route, Routes } from 'react-router-dom'
import Board from './pages/Boards/Board'
import { Profile } from './pages/Profile/Profile'
function App() {
    return (
        <Routes>
            <Route path='/' element={<Board />} />
            <Route path='/profile' element={<Profile />} />
        </Routes>
    )
}

export default App
