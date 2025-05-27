import axios from 'axios'
import { refreshApi } from '.'

const instance = axios.create({
    withCredentials: true, 
    headers: {
        'Content-Type': 'application/json'
    }
})

let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) prom.reject(error)
        else prom.resolve(token)
    })
    failedQueue = []
}

// RESPONSE INTERCEPTOR
instance.interceptors.response.use(
    response => {
        if (response.config.url.includes('auth/login')) {
            const path = '/trello' || '/'
            window.location.href = path
        }
        return response
    },
    async error => {
        const originalRequest = error.config

        if ((error.response?.status === 401 || error.response?.status === 403 ) && !originalRequest._retry) {
            if (isRefreshing) {
                localStorage.setItem('currentPath', window.location.pathname)
                window.location.href = '/auth'
                return Promise.reject(error)
            }
            
            originalRequest._retry = true
            isRefreshing = true
            try {
                await refreshApi() 
                processQueue(null)
                return instance(originalRequest)
            } catch (err) {
                processQueue(err, null)
                return Promise.reject(err)
            } finally {
                isRefreshing = false
            }
        }
        return Promise.reject(error)
    }
)

export default instance
