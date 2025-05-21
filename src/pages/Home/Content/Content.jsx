// MUI Component
import Box from '@mui/material/Box'

import Introduction from './Instroduction/Introduction'
const Content = () => {
    
    return (
        <Box sx={{ mt: (theme) => theme.trelloCustom.appBarHeight, mb: 0 }}>
            <Introduction/>
        </Box>
    )
}

export default Content