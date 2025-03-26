import { createContext } from 'react'

import { mockData } from '~/apis/mockdata'

const BoardContext = createContext()

function BoardProvider({ children }) {
    return (
        <BoardContext.Provider value={mockData}>
            {children}
        </BoardContext.Provider>
    )
}

export { BoardProvider, BoardContext }