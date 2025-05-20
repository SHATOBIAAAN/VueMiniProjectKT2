<template>
    <div class="profile-wrapper">
        <h1 class="profile-title" v-if="error">{{ error }}</h1>
        <h1 class="profile-title" v-else>My profile</h1>
        <div v-if="loading" class="loading">Загрузка данных...</div>
        <div v-else-if="user" class="profile-content">
            <div class="profile-info">
                <div class="profile-card">Username: {{ user.username }}</div>
                <div class="profile-card">Name: {{ user.firstName }}</div>
                <div class="profile-card">Lastname: {{ user.lastName }}</div>
                <div class="profile-card">Gender: {{ user.gender }}</div>
                <div class="profile-card">Email: {{ user.email }}</div>
            </div>
            <div class="profile-avatar">
                <img :src="user.image" alt="avatar" />
            </div>
        </div>
        <button @click="handleLogout" class="logout-btn">Выйти</button>
    </div>
</template>

<script>
import { getProfile, logout } from '@/services/auth'

export default {
    data() {
        return {
            user: null,
            loading: true,
            error: null,
        }
    },
    async mounted() {
        await this.fetchUserData()
    },
    methods: {
        async fetchUserData() {
            this.loading = true
            this.error = null

            try {
                this.user = await getProfile()
            } catch (error) {
                this.error = error.message
                console.error('Error fetching profile:', error)
            } finally {
                this.loading = false
            }
        },
        handleLogout() {
            logout()
            this.$router.push('/login')
        },
    },
}
</script>

<style>
.profile-wrapper {
    margin-top: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.profile-title {
    font-size: 40px;
    font-weight: 700;
    color: #23253a;
    margin-bottom: 30px;
}
.profile-content {
    display: flex;
    align-items: center;
    gap: 60px;
    margin-bottom: 30px;
}
.profile-info {
    display: flex;
    flex-direction: column;
    gap: 18px;
}
.profile-card {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(60, 60, 60, 0.12);
    padding: 12px 24px;
    font-size: 18px;
    color: #23253a;
    min-width: 270px;
}
.profile-avatar img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 2px 8px rgba(60, 60, 60, 0.12);
}
.loading {
    margin: 20px 0;
    font-size: 18px;
    color: #666;
}
.logout-btn {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #ff6464;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}
.logout-btn:hover {
    background-color: #e65757;
}
</style>
