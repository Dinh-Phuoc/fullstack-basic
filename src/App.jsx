import { Route, Routes } from 'react-router-dom'
import { Suspense, lazy } from 'react'

import Home from './pages/Home/Home'
const Board = lazy(() => import('./pages/Boards/Board'))
const Profile = lazy(() => import('./pages/Profile/ProfileDetail'))
const Auth = lazy(() => import('./pages/Auth/Auth'))

function App() {
    return (
        <Suspense>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/auth' element={<Auth />} />
                <Route path='/trello' element={<Board />} />
                <Route path='/profile' element={<Profile />} />
            </Routes>
        </Suspense>
    )
}

export default App
