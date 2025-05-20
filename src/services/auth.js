
const TOKEN_KEY = 'token'

const API_URL = 'https://dummyjson.com'


export async function login(username, password) {
    console.log('Отправка запроса авторизации:', { username, password })

    try {

        const finalUsername = username.trim()
        const finalPassword = password.trim()
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: finalUsername,
                password: finalPassword,
                expiresInMins: 60,
            })
        })

        const data = await response.json()
        console.log('Ответ от сервера:', data)

        if (!response.ok) {
            console.error('Ошибка авторизации:', data)
            throw new Error(data.message || 'Ошибка авторизации')
        }
        const token = data.accessToken || data.token
        if (!token) {
            throw new Error('Токен отсутствует в ответе')
        }
        setToken(token)
        console.log('Токен успешно сохранен:', token)

        // Уведомляем другие вкладки об изменении токена
        window.dispatchEvent(new Event('auth-changed'))

        return data
    } catch (error) {
        console.error('Исключение при авторизации:', error)
        throw error
    }
}


export function logout() {
    localStorage.removeItem(TOKEN_KEY)

    
    window.dispatchEvent(new Event('auth-changed'))
}

export async function getProfile() {
    const token = getToken()

    if (!token) {
        throw new Error('Токен не найден')
    }

    try {
        console.log('Отправка запроса на получение профиля с токеном:', token)

      
        const response = await fetch(`${API_URL}/user/me`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
    
        })

        const data = await response.json()
        console.log('Ответ профиля от сервера:', data)

        if (!response.ok) {
            console.error('Ошибка получения профиля:', data)
            throw new Error(data.message || 'Ошибка получения данных профиля')
        }

        return data
    } catch (error) {
        console.error('Исключение при получении профиля:', error)
        throw error
    }
}


export async function getUsers() {
    try {
        const response = await fetch(`${API_URL}/users?delay=500`)

        if (!response.ok) {
            throw new Error('Ошибка при загрузке пользователей')
        }

        const data = await response.json()
        return data.users
    } catch (error) {
        console.error('Ошибка при получении пользователей:', error)
        throw error
    }
}


export function setToken(token) {
    console.log('Сохранение токена:', token)
    localStorage.setItem(TOKEN_KEY, token)
}


export function getToken() {
    const token = localStorage.getItem(TOKEN_KEY)
    console.log('Получен токен из хранилища:', token)
    return token
}


export function isAuthenticated() {
    return !!getToken()
}
