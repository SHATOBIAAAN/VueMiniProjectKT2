import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Создаем глобальное событие изменения авторизации для синхронизации между вкладками
window.addEventListener('storage', event => {
    if (event.key === 'token') {
        window.dispatchEvent(new Event('auth-changed'))
    }
})

const app = createApp(App)

app.use(router)

app.mount('#app')
