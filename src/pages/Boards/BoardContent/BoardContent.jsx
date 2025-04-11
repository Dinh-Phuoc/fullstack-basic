import { 
    DndContext, 
    DragOverlay,
    useSensor, 
    useSensors, 
    defaultDropAnimationSideEffects,
    closestCorners, 
    pointerWithin,
    getFirstCollision
    
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import Box from '@mui/material/Box'
import ListColumn from './ListColumns/ListColumn'
import { useCallback, useEffect, useRef, useState } from 'react'
import { cloneDeep, isEmpty } from 'lodash'

import CardItem from './ListColumns/Column/ListCards/CardItem/CardItem'
import Column from './ListColumns/Column/Column'
import { generatePlaceHolderCard } from '~/utils/formatter'
import { MouseSensor, TouchSensor, PointerSensor } from '~/customLibs/DnDKitSensors'

const ACTIVE_DRAG_ITEM_TYPE = {
    COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMNS',
    CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}
 
export default function BoardContent({ 
    board, 
    createNewColumn, 
    createNewCard,
    moveColumns, 
    moveCardInTheSameColumn,
    moveCardToDifferentColumn,
    deleteColumnDetails
}) {

    const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
    const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
    const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 250 } })

    const sensors = useSensors(pointerSensor, mouseSensor, touchSensor)
    const [orderedColumns, setOrderedColumns] = useState([])

    const [activeDragItemType, setActiveDragItemType] = useState(null)
    const [activeDragItemId, setActiveDragItemId] = useState(null)
    const [activeDragItemData, setActiveDragItemData] = useState(null)
    const [oldColumn, setOldColumn] = useState(null)
    const lastOverId = useRef(null)

    
    useEffect(() => {
        setOrderedColumns(board.columns)
    }, [board])

    const findColumnByCardId = (cardId) => {
        return orderedColumns.find(column => column?.cards?.map(card => card._id)?.includes(cardId)) 
    } 

    const moveCardBetweenDifferentColumn = (
        active,
        over,
        activeColumn,
        overColumn,
        activeDraggingCardId,
        overCardId,
        activeDraggingCardData,
        triggerFrom
    ) => {
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
            if (isEmpty(nextActiveColumn.cards)) {
                nextActiveColumn.cards = [generatePlaceHolderCard(nextActiveColumn)]
            }
            nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)


            nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)
            const rebuid_activeDraggingCardData = {
                ...activeDraggingCardData,
                columnId: nextOverColumn._id
            }
            nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuid_activeDraggingCardData)
            nextOverColumn.cards = nextOverColumn.cards.filter(card => !card.FE_PlaceholderCard)
            nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)

            if (triggerFrom === 'handleDragEnd') {
                moveCardToDifferentColumn(activeDragItemId, oldColumn._id, nextOverColumn._id, nextColumns)
            }

            return nextColumns
        })  
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
            moveCardBetweenDifferentColumn(active,
                over,
                activeColumn,
                overColumn,
                activeDraggingCardId,
                overCardId,
                activeDraggingCardData,
                'handleDragOver'
            )
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
                moveCardBetweenDifferentColumn(active,
                    over,
                    activeColumn,
                    overColumn,
                    activeDraggingCardId,
                    overCardId,
                    activeDraggingCardData,
                    'handleDragEnd'
                )
            } else {
                const oldCardIndex = oldColumn?.cards?.findIndex(column => column._id === activeDragItemId)
    
                const newCardIndex = overColumn?.cards?.findIndex(column => column._id === overCardId)

                const dndOrderedCard = arrayMove(oldColumn?.cards, oldCardIndex, newCardIndex)
                const dndOrderedCardIds = dndOrderedCard.map(card => card._id)
                setOrderedColumns(prevColumns => {
                    const nextColumns = cloneDeep(prevColumns)  
                    const targetColumn = nextColumns.find(column => column._id === overColumn._id)

                    targetColumn.cards = dndOrderedCard
                    targetColumn.cardOrderIds = dndOrderedCard.map(card => card._id)

                    return nextColumns
                })

                moveCardInTheSameColumn(dndOrderedCard, dndOrderedCardIds, oldColumn._id)
            }
        }

        // Process the column
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) { 
            if (active.id !== over.id) {
                const oldColumnIndex = orderedColumns.findIndex(column => column._id === active.id)
    
                const newColumnIndex = orderedColumns.findIndex(column => column._id === over.id)
    
                const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)

                setOrderedColumns(dndOrderedColumns)
                moveColumns(dndOrderedColumns )
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

    const collisionDetectionStrategy = useCallback((args) => {
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
            return closestCorners({ ...args })
        }

        const pointerIntersections = pointerWithin(args)

        if (!pointerIntersections?.length) return 
        let overId = getFirstCollision(pointerIntersections, 'id')

        if (overId) {
            const checkColumn = orderedColumns.find(column => column._id === overId)
            if (checkColumn) {
                overId = closestCorners({ 
                    ...args,
                    droppableContainers: args.droppableContainers.filter(
                        (container) => (container.id !== overId) && checkColumn?.cardOrderIds?.includes(container.id)
                    )
                })[0]?.id
            }
            lastOverId.current = overId
            return [{ id: overId }]
        }

        return lastOverId.current ? [{ id: lastOverId.current }] : []
    }, [activeDragItemType, orderedColumns])

    return (
        <DndContext
            // collisionDetection={closestCorners} 
            collisionDetection={collisionDetectionStrategy} 
            sensors={sensors} 
            onDragStart={handleDragStart}
            onDragOver={handleDragOver} 
            onDragEnd={handleDragEnd} 
        >
            <Box sx={{
                bgcolor: (theme) => (theme.palette.primary.main), 
                width: '100%',
                height: (theme) => theme.trelloCustom.boardContentHeight,
                display: 'flex'
            }}> 
                <ListColumn 
                    createNewCard={createNewCard} 
                    createNewColumn={createNewColumn} 
                    columns = {orderedColumns}
                    deleteColumnDetails={deleteColumnDetails}
                />
                <DragOverlay dropAnimation={dropAnimation}>
                    {!activeDragItemType && null}
                    {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData}/>}
                    {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <CardItem card={activeDragItemData}/>}
                </DragOverlay>
            </Box>
        </DndContext>
    )
}

