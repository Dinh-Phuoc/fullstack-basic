import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import Box from '@mui/material/Box'
import CardItem from './CardItem/CardItem'
export default function ListCards({ cards }) {
    return (
        <SortableContext items={cards?.map((card) => card.uuid)} strategy={verticalListSortingStrategy}>       
            <Box 
                sx={{
                    p: '0 5px 5px 5px',
                    m: '0 5px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    overflowX: 'hidden',
                    overflowY: 'auto',
                    maxHeight: (theme) => `calc(${theme.trelloCustom.boardContentHeight} - 
                                                ${theme.spacing(5)} - 
                                                ${(theme) => theme.trelloCustom.columnHeaderHeightN_HEADER_HEIGHT} - 
                                                ${(theme) => theme.trelloCustom.columnFooterHeight})`,
                    '& .MuiCard-root': {
                        overflow: 'unset'
                    },
                    '&::webkit-scrollbar': {
                        width: '8px',
                        borderRadius: '0'
                    },
                    '&::webkit-scrollbar-thumb': {
                        backgroundColor: 'rgba(0, 0, 0, 0.15)',
                        borderRadius: '4px'
                    },
                    '&::webkit-scrollbar-track': {
                        backgroundColor: '#gba(0, 0, 0, 0)',
                        borderRadius: '0'
                    }
                }}
            >
                {cards?.map( card => <CardItem key={card.uuid} card={card}/>)}
            </Box>
        </SortableContext>
    )
}