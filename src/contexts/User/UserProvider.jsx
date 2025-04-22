import { useReducer } from 'react'
import UserContext from './UserContext'
import reducer, { initState } from './reducer'

export default function UserProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initState)
    return (
        <UserContext.Provider value={[state, dispatch]}>
            { children }
        </UserContext.Provider>
    )
}