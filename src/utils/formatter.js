export default function capitalizeFirstLetter(val) {
    if (!val) return ''
    return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
}

export function generatePlaceHolderCard(column) {
    return {
        uuid: `${column.uuid}-placeholder-card`,
        boardUuid: column.boardUuid,
        columnUuid: column.uuid,
        FE_PlaceholderCard: true 
    }
}