let apiRoot = ''

if (process.env.BUILD_MODE === 'dev') {
    apiRoot = 'http://localhost:8017'
}

if (process.env.BUILD_MODE === 'prod') {
    apiRoot = 'http://rookie.io.vn'
}

export const API_ROOT = apiRoot

