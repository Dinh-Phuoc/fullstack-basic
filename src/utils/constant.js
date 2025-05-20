let apiRoot = ''
let authRoot = ''

if (process.env.BUILD_MODE === 'dev') {
    apiRoot = 'http://localhost:8017'
    authRoot = 'http://localhost:3495'
}

if (process.env.BUILD_MODE === 'prod') {
    apiRoot = 'https://api.rookie.io.vn'
    authRoot = 'https://api.rookie.io.vn'
}

export const API_ROOT = apiRoot 
export const AUTH_ROOT = authRoot 

