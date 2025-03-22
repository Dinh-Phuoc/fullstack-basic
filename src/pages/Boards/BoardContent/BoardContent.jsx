import { Box } from '@mui/material'

export default function BoardContent() {
    return (
        <Box sx={{
            backgroundColor: 'primary.main',
            width: '100%',
            height: (theme) => `calc(100vh - ${theme.trelloCustom.boardBarHeight} - ${theme.trelloCustom.appBarHeight})`,
            display: 'flex',
            alignItems: 'center'
        }}> 
            Board Centent 
        </Box>
    )
}

