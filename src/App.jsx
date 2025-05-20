import { Route, Routes } from 'react-router-dom'
import Board from './pages/Boards/Board'
import Profile from './pages/Profile/ProfileDetail'
import Auth from './pages/Auth/Auth'
import Home from './pages/Home/Home'

function App() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/trello' element={<Board />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/auth' element={<Auth />} />
        </Routes>
    )
}

export default App
