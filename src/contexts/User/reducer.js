
const initState = {}

const reducer = (state, action) => {
    switch (action.type) {
    case 'SET_USER_INFO': 
        return action.payload ? { ...state, ...action.payload } : {}
    default: 
        throw new Error ('Invalid action type')
    
    }
}

export default reducer
export { initState }
