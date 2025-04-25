
const initState = {
    notLine: false,
    activeStore: false,
    elementActive: []
}

function reducer(state, action) {
    switch (action.type) {
    case 'SET_ACTIVE_TAB':
        return {
            ...state,
            elementActive: action.payload.elementActive,
            notLine: action.payload.notLine
        }
        
    default: 
        throw new Error ('Invalid action type')
    }
}

export default reducer
export { initState }