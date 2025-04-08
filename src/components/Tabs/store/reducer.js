
const initState = {
    activeStore: false,
    elementActive: []
}

function reducer(state, action) {
    switch (action.type) {
    case 'SET_ACTIVE_TAB':
        return {
            ...state,
            elementActive: action.payload
        }
        
    default: 
        throw new Error ('Invalid action type')
    }
}

export default reducer
export { initState }