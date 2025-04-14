
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import Attachment from '@mui/icons-material/Attachment'
import Comment from '@mui/icons-material/Comment'
import Group from '@mui/icons-material/Group'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { Checkbox } from '@mui/material'


export default function CardItem({ card }) {
    const shouldShowCardAction = () => {
        return !!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachments?.length
    }

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: card?._id, data: { ...card } })

    const dndKitCardStyle = {
        transform: CSS.Translate.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : undefined,
        border: isDragging ? '1px solid #ff9a9cc4' : undefined
    }
    return (
        <Card 
            ref={setNodeRef} style={dndKitCardStyle} {...attributes} {...listeners}
            sx={{ 
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset',
                display: card?.FE_PlaceholderCard ? 'none' : 'block',
                border: '1px solid transparent',
                '&:hover': { borderColor: theme => theme.palette.primary.main }
            }}
        >
            {card?.cover && <CardMedia sx={{ height: 140 }} image={card?.cover} />}
            <CardContent sx={{ p: 0, mt: '8px' }}>
                <Checkbox sx={{ p: 0, ml: '13px' }}/> { card?.title }
            </CardContent>
            { shouldShowCardAction() && 
            <CardActions sx={{ p: '0 4px 8px 4px' }}>
                {!!card?.memberIds?.length &&
                <Button sx={{ color: '#ff9a9cc4' }} size="small" startIcon={<Group/>}>
                    <Typography variant='body1'>{card.memberIds.length}</Typography>
                </Button>}

                {!!card?.comments?.length &&
                <Button sx={{ color: '#ff9a9cc4' }} size="small" startIcon={<Comment/>}>
                    <Typography variant='body1'>{card.comments.length}</Typography>
                </Button>}

                {!!card?.attachments?.length &&
                <Button sx={{ color: '#ff9a9cc4' }} size="small" startIcon={<Attachment/>}>
                    <Typography variant='body1'>{card.attachments.length}</Typography>
                </Button>}      
            </CardActions>}
        </Card>
    )
}