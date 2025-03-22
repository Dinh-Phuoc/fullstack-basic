import { experimental_extendTheme as extendTheme } from '@mui/material'
import { cyan } from '@mui/material/colors'
import { teal } from '@mui/material/colors'

const theme = extendTheme({
    trelloCustom: {
        appBarHeight: '48px',
        boardBarHeight: '58px'
    }, 
    colorSchemes: {
        light: {
            palete: {
                primary: teal
            }
        },
        dark: {
            palete: {
                primary: cyan
            }
        }
    }
})

export default theme