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
                },
                MuiCssBaseline: {
                    styleOverrides: {
                        '*': {
                            '&::-webkit-scrollbar': {
                                borderRadius: 0,
                                height: '6px'
                            },
                            '&::-webkit-scrollbar-thumb': {
                                borderRadius: '6px',
                                backgroundColor: 'rgba(0, 0, 0, 0.15)'
                            },
                            '&::-webkit-scrollbar-track': {
                                borderRadius: 0,
                                backgroundColor: 'rgba(0, 0, 0, 0)'
                            }
                        }
                    }
                }
            }
        },
        dark: {
            palette: {
                primary: {
                    main: '#121212'
                },
                background: {
                    default: '#ff9a9cc4'
                }
            },
            components: {
                MuiTooltip: {
                    styleOverrides: {
                        tooltip: {
                            backgroundColor: '#333643',
                            color: '#ff9a9cc4'
                        }
                    }
                },
                MuiCssBaseline: {
                    styleOverrides: {
                        '*': {
                            '&::-webkit-scrollbar': {
                                borderRadius: 0,
                                height: '6px'
                            },
                            '&::-webkit-scrollbar-thumb': {
                                borderRadius: '6px',
                                backgroundColor: '#ff9a9cc4'
                            },
                            '&::-webkit-scrollbar-track': {
                                borderRadius: 0,
                                backgroundColor: 'rgba(248, 248, 248, 0)'
                            }
                        }
                    }
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
                    '&.MuiButton-outlined:hover': {
                        border: '1px solid'
                    }
                }
            }
        },
    
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontSize: '0.875rem',
                    marginBottom: '4px',
                    '&.MuiInputLabel-shrink': {
                        fontSize: '1.1rem'
                    }
                }
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
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    '&.MuiInput-root': {
                        marginTop: '6px',
                        '&:hover:not(.Mui-disabled, .Mui-error):before': {
                            borderColor: '#ff9a9cc4'
                        }
                    }
                }
            }
        }
    }
})

export default theme