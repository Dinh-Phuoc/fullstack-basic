import { experimental_extendTheme as extendTheme } from '@mui/material/styles'


const APP_BAR_HEIGHT = '58px'
const BOARD_BAR_HEIGHT = '60px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${BOARD_BAR_HEIGHT} - ${APP_BAR_HEIGHT})`
const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'


const theme = extendTheme({
    trelloCustom: {
        appBarHeight: APP_BAR_HEIGHT,
        boardBarHeight: BOARD_BAR_HEIGHT,
        boardContentHeight: BOARD_CONTENT_HEIGHT,
        columnHeaderHeight: COLUMN_HEADER_HEIGHT,
        columnFooterHeight: COLUMN_FOOTER_HEIGHT
    },

    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: '#ff9a9cc4'
                }
            },
            components: {
                MuiTooltip: {
                    styleOverrides: {
                        tooltip: {
                            backgroundColor: '#ffffffc4',
                            color: '#ff9a9cc4'
                        }
                    }
                }
            }
        },
        dark: {
            palette: {
                primary: {
                    main: '#9a9a9a'
                }
            }
        }
    },

    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderWidth: '1px',
                    '&:hover': {
                        borderWidth: '2px'
                    }
                }
            }
        },
    
        MuiInputLabel: {
            styleOverrides: {
                root: () => ({
                    fontSize: '0.875rem'
                })
            }
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    '&.MuiTypography-body1': { fontSize: '0.875rem' }
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                fontSize: '0.875rem',
            
                '& fieldset': {
                    borderWidth: '1px !important'
                },
                '&:hover fieldset': {
                    borderWidth: '2px !important'
                },
                '&.Mui-focused fieldset': {
                    borderWidth: '2px !important'
                }
            }
        }
    }
})

export default theme