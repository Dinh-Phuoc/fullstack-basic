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

import { useCallback, useEffect, useRef, useState } from 'react'
import { cloneDeep, isEmpty } from 'lodash'

import Column from './ListColumns/Column/Column'
import ListColumn from './ListColumns/ListColumn'
import CardItem from './ListColumns/Column/ListCards/CardItem/CardItem'
import { generatePlaceHolderCard } from '~/utils/formatter'
import { MouseSensor, TouchSensor, PointerSensor } from '~/customLibs/DnDKitSensors'
import { moveCardToDifferentColumnApi, updateBoardDetailsApi, updateColumnDetailsApi } from '~/apis'
import { useDispatch } from 'react-redux'
import { boardSilce } from '~/redux/slice/boardSlice'

const ACTIVE_DRAG_ITEM_TYPE = {
    COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMNS',
    CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}
 
export default function BoardContent({ board }) {

    const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
    const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
    const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 1000, tolerance: 250 } })

    const sensors = useSensors(pointerSensor, mouseSensor, touchSensor)
    const [orderedColumns, setOrderedColumns] = useState([])

    const [activeDragItemType, setActiveDragItemType] = useState(null)
    const [activeDragItemId, setActiveDragItemId] = useState(null)
    const [activeDragItemData, setActiveDragItemData] = useState(null)
    const [oldColumn, setOldColumn] = useState(null)
    const lastOverId = useRef(null)
    const dispatch = useDispatch()
    
    useEffect(() => {
        setOrderedColumns(board.columns)
    }, [board])

    const findColumnByCardId = (cardUuid) => {
        return orderedColumns.find(column => column?.cards?.map(card => card.uuid)?.includes(cardUuid)) 
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
        const overCardIndex = overColumn.cards.findIndex(card => card.uuid === overCardId)

        let newCardIndex
        const isBelowOverItem = active.rect.current.translated &&
            active.rect.current.translated.top > over.rect.top + over.rect.height
        const modifier = isBelowOverItem ? 1 : 0
        newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn.length + 1

        const cloneColumns = cloneDeep(orderedColumns)
        const cloneActiveColumn = cloneColumns.find(column => column.uuid === activeColumn.uuid)
        const cloneOverColumn = cloneColumns.find(column => column.uuid === overColumn.uuid)

        if (cloneActiveColumn) {
            cloneActiveColumn.cards = cloneActiveColumn.cards.filter(card => card.uuid !== activeDraggingCardId)
            if (isEmpty(cloneActiveColumn.cards)) {
                cloneActiveColumn.cards = [generatePlaceHolderCard(cloneActiveColumn)]
            }
            cloneActiveColumn.cardOrderIds = cloneActiveColumn.cards.map(card => card.uuid)
        }

        if (cloneOverColumn) {
            cloneOverColumn.cards = cloneOverColumn.cards.filter(card => card.uuid !== activeDraggingCardId)
            const rebuid_activeDraggingCardData = {
                ...activeDraggingCardData,
                columnUuid: cloneOverColumn.uuid
            }
            cloneOverColumn.cards = cloneOverColumn.cards.toSpliced(newCardIndex, 0, rebuid_activeDraggingCardData)
            cloneOverColumn.cards = cloneOverColumn.cards.filter(card => !card.FE_PlaceholderCard)
            cloneOverColumn.cardOrderIds = cloneOverColumn.cards.map(card => card.uuid)
        }

        const dataToUpdate = {
            orderedColumns: cloneColumns,
            orderedCardIds: cloneColumns.map(column => column.uuid),
            boardUuid: board.uuid
        }
        dispatch(boardSilce.actions.updateBoard(dataToUpdate))

        if (triggerFrom === 'handleDragEnd') {
            const dndOrderedColumnsIds = cloneColumns.map(column => column.uuid)

            const dataToUpdate = {
                orderedColumns: cloneColumns,
                orderedCardIds: dndOrderedColumnsIds,
                boardUuid: board.uuid
            }

            dispatch(boardSilce.actions.updateBoard(dataToUpdate))
    
            let oldCardOrderIds = cloneColumns.find(column => column.uuid === oldColumn.uuid)?.cardOrderIds
    
            if (oldCardOrderIds[0].includes('placeholder-card')) oldCardOrderIds = []
            
            moveCardToDifferentColumnApi({
                currentCardId: activeDragItemId,
                oldColumnId: oldColumn.uuid,
                oldCardOrderIds,
                newColumnId: cloneOverColumn.uuid,
                newCardOrderIds: cloneColumns.find(column => column.uuid === cloneOverColumn.uuid)?.cardOrderIds
            })
        }
    }

    const handleDragStart = (event) => {
        setActiveDragItemId(event?.active?.data?.current?.uuid)
        
        setActiveDragItemType(event?.active?.data?.current?.columnUuid ? 
            ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)

        setActiveDragItemData(event?.active?.data?.current)
        if (event?.active?.data?.current?.columnUuid) {
            setOldColumn(findColumnByCardId(event?.active?.data?.current?.uuid))
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

        if (activeColumn.uuid !== overColumn.uuid) {
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
        const activeId = event?.active?.id
        const overId = event?.over?.id

        const { active, over } = event
        if (!over || !active) return
        
        // Process the card
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {

            const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
            const { id: overCardId } = over

            const activeColumn = findColumnByCardId(activeDraggingCardId)
            const overColumn = findColumnByCardId(overCardId)

            if (!activeColumn || !overColumn) return 

            if (oldColumn.uuid !== overColumn.uuid) {
                moveCardBetweenDifferentColumn(
                    active,
                    over,
                    activeColumn,
                    overColumn,
                    activeDraggingCardId,
                    overCardId,
                    activeDraggingCardData,
                    'handleDragEnd'
                )
            } else {
                // In case the same column: oldColumn = overColumn = activeColumn
                const oldCardIndex = activeColumn?.cards?.findIndex(card => card.uuid === activeDragItemId)
    
                const newCardIndex = activeColumn?.cards?.findIndex(card => card.uuid === overCardId)

                const dndOrderedCard = arrayMove(activeColumn?.cards, oldCardIndex, newCardIndex)

                const dndOrderedCardIds = dndOrderedCard.map(card => card.uuid)
                
                const dataToUpdate = {
                    dndOrderedCard,
                    dndOrderedCardIds,
                    boardUuid: board.uuid,
                    columnUuid: activeColumn.uuid
                }

                dispatch(boardSilce.actions.updateColumn(dataToUpdate))

                updateColumnDetailsApi(activeColumn.uuid, {
                    cardOrderIds: dndOrderedCardIds
                })
            }
        }

        // Process the column
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) { 
            if (activeId !== overId) {

                const oldColumnIndex = orderedColumns.findIndex(column => column.uuid === activeId)
    
                const newColumnIndex = orderedColumns.findIndex(column => column.uuid === overId)
    
                const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)

                const dndOrderedColumnsIds = dndOrderedColumns.map(column => column.uuid)

                const dataToUpdate = {
                    orderedColumns: dndOrderedColumns,
                    orderedCardIds: dndOrderedColumnsIds,
                    boardUuid: board.uuid
                }
                
                dispatch(boardSilce.actions.updateBoard(dataToUpdate))
        
                updateBoardDetailsApi(board.uuid, {
                    columnOrderIds: dndOrderedColumnsIds
                })
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
            const checkColumn = orderedColumns.find(column => column.uuid === overId)
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
            collisionDetection={collisionDetectionStrategy} 
            sensors={sensors} 
            onDragStart={handleDragStart}
            onDragOver={handleDragOver} 
            onDragEnd={handleDragEnd} 
        >
            <Box sx={{
                bgcolor: (theme) => (theme.palette.primary.main), 
                width: '100%',
                pr: '16px',
                height: (theme) => theme.trelloCustom.boardContentHeight,
                display: 'flex'
            }}> 
                <ListColumn />
                <DragOverlay dropAnimation={dropAnimation}>
                    {!activeDragItemType && null}
                    {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData}/>}
                    {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <CardItem card={activeDragItemData}/>}
                </DragOverlay>
            </Box>
        </DndContext>
    )
}

