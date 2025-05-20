<template>
    <header class="header">
        <nav class="menu">
            <RouterLink to="/"><li>Home</li></RouterLink>
            <RouterLink to="/users"><li>Users</li></RouterLink>
            <RouterLink v-if="isAuthenticated" to="/profile"
                ><li>Profile</li></RouterLink
            >
            <RouterLink v-else to="/login"><li>Login</li></RouterLink>
        </nav>
    </header>
</template>

<script>
import { RouterLink } from 'vue-router'
import { isAuthenticated } from '@/services/auth'

export default {
    data() {
        return {
            isAuthenticated: isAuthenticated(),
        }
    },
    created() {
        // Слушаем событие изменения авторизации
        window.addEventListener('auth-changed', this.checkAuth)
    },
    beforeUnmount() {
        // Убираем слушатель событий перед удалением компонента
        window.removeEventListener('auth-changed', this.checkAuth)
    },
    methods: {
        checkAuth() {
            this.isAuthenticated = isAuthenticated()
        },
    },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Heebo:wght@400;700&display=swap');
.header {
    font-family: 'Heebo', sans-serif;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: right;
    padding-top: 20px;
}

.menu {
    font-family: 'Heebo', sans-serif;
    display: flex;
    gap: 30px;
    list-style: none;
    font-size: 30px;
    padding-right: 117px;
}
.menu a {
    text-decoration: none;
    color: black;
}
.menu a.router-link-active {
    color: #ff6464;
    font-weight: bold;
}
</style>
