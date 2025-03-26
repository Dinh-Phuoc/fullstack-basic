import { 
    DndContext, 
    DragOverlay,
    PointerSensor, 
    MouseSensor, 
    TouchSensor, 
    useSensor, 
    useSensors, 
    defaultDropAnimationSideEffects,
    closestCorners 
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import Box from '@mui/material/Box'
import ListColumn from './ListColumns/ListColumn'
import mapOrder from '~/utils/sortter.js'
import { useContext, useEffect, useState } from 'react'
import { BoardContext } from '~/contexts/FormatterContext'
import { cloneDeep } from 'lodash'

import CardItem from './ListColumns/Column/ListCards/CardItem/CardItem'
import Column from './ListColumns/Column/Column'

const ACTIVE_DRAG_ITEM_TYPE = {
    COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMNS',
    CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}
 
export default function BoardContent() {
    const board = useContext(BoardContext).board

    const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
    const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
    const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })

    const sensors = useSensors(pointerSensor, mouseSensor, touchSensor)
    const [orderedColumns, setOrderedColumns] = useState([])

    const [activeDragItemType, setActiveDragItemType] = useState(null)
    const [activeDragItemId, setActiveDragItemId] = useState(null)
    const [activeDragItemData, setActiveDragItemData] = useState(null)
    const [oldColumn, setOldColumn] = useState(null)

    
    useEffect(() => {
        const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
        setOrderedColumns(orderedColumns)
    }, [board])

    const findColumnByCardId = (cardId) => {
        return orderedColumns.find(column => column?.cards?.map(card => card._id)?.includes(cardId)) 
    } 

    const handleDragStart = (event) => {
        setActiveDragItemId(event?.active?.id)
        setActiveDragItemType(event?.active?.data?.current?.columnId ? 
            ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
        setActiveDragItemData(event?.active?.data?.current)

        if (event?.active?.data?.current?.columnId) {
            setOldColumn(findColumnByCardId(event?.active?.id))
        }
    }

    const handleDragOver = (event) => {
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

        const { active, over } = event

        if (!over || !active) return

        const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
        const { id: overCardId } = over

        const activeColumn = findColumnByCardId(activeDraggingCardId)
        const overColumn = findColumnByCardId(overCardId)

        if (!activeColumn || !overColumn) return 

        if (activeColumn._id !== overColumn._id) {
            setOrderedColumns(prevColumns => {
                const overCardIndex = overColumn.cards.findIndex(card => card._id === overCardId)

                let newCardIndex
                const isBelowOverItem = active.rect.current.translated &&
                    active.rect.current.translated.top > over.rect.top + over.rect.height
                const modifier = isBelowOverItem ? 1 : 0
                newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn.length + 1

                const nextColumns = cloneDeep(prevColumns)
                const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
                const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

                if (!nextActiveColumn || !nextOverColumn) return prevColumns

                nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)
                nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)

                nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)
                nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDraggingCardData)
                nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)


                return nextColumns
            })
        }
    }

    const handleDragEnd = (event) => {
        const { active, over } = event
        if (!over || !active) return
        
        // Process the card
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {

            const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
            const { id: overCardId } = over

            const activeColumn = findColumnByCardId(activeDraggingCardId)
            const overColumn = findColumnByCardId(overCardId)

            if (!activeColumn || !overColumn) return 

            if (oldColumn._id !== overColumn._id) {
                //
            } else {
                const oldCardIndex = oldColumn?.cards?.findIndex(column => column._id === activeDragItemId)
    
                const newCardIndex = overColumn?.cards?.findIndex(column => column._id === overCardId)

                const dndOrderedCard = arrayMove(oldColumn?.cards, oldCardIndex, newCardIndex)
                
                setOrderedColumns(prevColumns => {
                    const nextColumns = cloneDeep(prevColumns)  
                    const targetColumn = nextColumns.find(column => column._id === overColumn._id)
                    
                    targetColumn.cards = dndOrderedCard
                    targetColumn.cardOrderIds = dndOrderedCard.map(card => card._id)

                    return nextColumns
                })
            }
        }

        // Process the column
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) { 
            if (active.id !== over.id) {
                const oldColumnIndex = orderedColumns.findIndex(column => column._id === active.id)
    
                const newColumnIndex = orderedColumns.findIndex(column => column._id === over.id)
    
                const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)
                // const dndOrderedColumnsIds = dndOrderedColumns.map(column => column._id)
                setOrderedColumns(dndOrderedColumns)
            }
        }
        setActiveDragItemData(null)
        setActiveDragItemId(null)
        setActiveDragItemType(null)
        setOldColumn(null)
    }

    const dropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({
            styles: {
                active: {
                    opacity: 0.5
                }
            }
        })
    }

    return (
        <DndContext
            collisionDetection={closestCorners} 
            sensors={sensors} 
            onDragStart={handleDragStart}
            onDragOver={handleDragOver} 
            onDragEnd={handleDragEnd} 
        >
            <Box sx={{
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'), 
                width: '100%',
                height: (theme) => theme.trelloCustom.BoardContentHeight,
                display: 'flex',
                p: '10px 0'
            }}> 
                <ListColumn columns = {orderedColumns}/>
                <DragOverlay dropAnimation={dropAnimation}>
                    {!activeDragItemType && null}
                    {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData}/>}
                    {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <CardItem card={activeDragItemData}/>}
                </DragOverlay>
            </Box>
        </DndContext>
    )
}

