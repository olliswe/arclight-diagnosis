// export const API_URL = 'https://ncdc-covid.herokuapp.com'
export const API_URL:string = 'http://127.0.0.1:8000'

export const API_ROUTES = {
    CURRENT_USER : '/accounts/current_user/',
    LOGIN:'/accounts/api-token-auth/'
}

export const ROUTES = {
    LOGIN:'/login',
    NEW_CASES:'/',
    REOPENED_CASES:'/reopened',
    ARCHIVED_CASES:'/archived',
    VIEW_CASE:'/case/:id',
}