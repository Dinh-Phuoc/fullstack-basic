// MUI Component
import Box from '@mui/material/Box'

import Introduction from './Instroduction/Introduction'
import Review from './Review/Review'
import Convenience from './Convenience/Convenience'
const Content = () => {
    
    return (
        <Box sx={{ mt: (theme) => theme.trelloCustom.appBarHeight, mb: 0 }}>
            <Introduction/>
            <Review/>
            <Convenience/>
        </Box>
    )
}

export default Content