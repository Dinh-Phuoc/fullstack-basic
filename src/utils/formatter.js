export default function capitalizeFirstLetter(val) {
    if (!val) return ''
    return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
}

export function generatePlaceHolderCard(column) {
    return {
        _id: `${column._id}-placeholder-card`,
        boardId: column._boardId,
        columnId: column._id,
        FE_PlaceholderCard: true 
    }
}