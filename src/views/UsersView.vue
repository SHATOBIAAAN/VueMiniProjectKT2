<template>
    <div class="container">
        <h1 class="users-title">Пользователи</h1>

        <div v-if="loading" class="loading">Загрузка пользователей...</div>
        <div v-if="error" class="error-message">{{ error }}</div>

        <section v-else class="users-list">
            <div
                v-for="user in displayedUsers"
                :key="user.id"
                class="user-card"
            >
                <div class="user-info">
                    <img :src="user.image" alt="avatar" class="user-avatar" />
                    <span>{{ user.firstName }} {{ user.lastName }}</span>
                </div>
                <span class="email">{{ user.email }}</span>
            </div>

            <div class="pagination" v-if="users.length > usersPerPage">
                <button
                    v-for="page in totalPages"
                    :key="page"
                    @click="currentPage = page"
                    :class="{ active: currentPage === page }"
                    class="page-btn"
                >
                    {{ page }}
                </button>
            </div>
        </section>
    </div>
</template>

<script>
import { getUsers } from '@/services/auth'

export default {
    data() {
        return {
            users: [],
            loading: true,
            error: null,
            currentPage: 1,
            usersPerPage: 5,
        }
    },
    computed: {
        displayedUsers() {
            const start = (this.currentPage - 1) * this.usersPerPage
            const end = start + this.usersPerPage
            return this.users.slice(start, end)
        },
        totalPages() {
            return Math.ceil(this.users.length / this.usersPerPage)
        },
    },
    async mounted() {
        await this.fetchUsers()
    },
    methods: {
        async fetchUsers() {
            this.loading = true
            try {
                this.users = await getUsers()
            } catch (error) {
                this.error = error.message
                console.error('Error fetching users:', error)
            } finally {
                this.loading = false
            }
        },
    },
}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 100px;
}
.users-title {
    font-size: 36px;
    font-weight: 700;
    color: #23253a;
    margin-bottom: 30px;
}
.users-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    margin-top: 20px;
    width: 100%;
    max-width: 800px;
}
.user-card {
    width: 100%;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(60, 60, 60, 0.3);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 24px;
    font-size: 18px;
}
.user-info {
    display: flex;
    align-items: center;
    gap: 15px;
}
.user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
}
.user-card .email {
    color: #777;
    font-size: 16px;
}
.loading {
    margin: 40px 0;
    font-size: 18px;
    color: #666;
}
.error-message {
    background-color: #ffe6e6;
    color: #e41e1e;
    padding: 15px;
    border-radius: 5px;
    text-align: center;
    margin: 20px 0;
    width: 100%;
    max-width: 800px;
}
.pagination {
    display: flex;
    gap: 10px;
    margin-top: 30px;
}
.page-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: none;
    background: #f0f0f0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}
.page-btn.active {
    background: #23253a;
    color: white;
}
</style>
