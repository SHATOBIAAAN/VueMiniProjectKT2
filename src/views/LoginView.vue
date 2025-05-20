<template>
    <div class="auth-wrapper">
        <div class="auth-box">
            <h1 class="title">Authorization</h1>
            <form @submit.prevent="handleLogin">
                <div v-if="error" class="error-message">
                    {{ error }}
                </div>
                <div class="form-group">
                    <label for="username">Login</label>
                    <input
                        type="text"
                        id="username"
                        v-model.trim="username"
                        required
                    />
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        v-model.trim="password"
                        required
                    />
                </div>
                <button type="submit" :disabled="loading">
                    {{ loading ? 'Loading...' : 'Submit' }}
                </button>
            </form>
            <div class="hint-block">
                <p class="hint">Подсказка: использовать тестовые данные</p>
                <p class="hint">username: <strong>emilys</strong></p>
                <p class="hint">password: <strong>emilyspass</strong></p>
                <button @click="setTestCredentials" class="auto-fill-btn">
                    Автозаполнение
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { login } from '@/services/auth'

export default {
    data() {
        return {
            username: '',
            password: '',
            error: '',
            loading: false,
        }
    },
    methods: {
        async handleLogin() {
            if (!this.username || !this.password) {
                this.error = 'Введите логин и пароль'
                return
            }

            this.error = ''
            this.loading = true

            try {
                console.log('Логин с данными:', {
                    username: this.username,
                    password: this.password,
                })

                await login(this.username, this.password)

                console.log('Авторизация успешна')

                this.$router.push('/profile')
            } catch (error) {
                console.error('Ошибка при обработке входа:', error)
                this.error = error.message || 'Ошибка авторизации'
            } finally {
                this.loading = false
            }
        },
        setTestCredentials() {
            this.username = 'emilys'
            this.password = 'emilyspass'
        },
    },
}
</script>

<style scoped>
.auth-wrapper {
    margin-top: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.auth-box {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(60, 60, 60, 0.2);
    padding: 32px 40px 24px 40px;
    min-width: 320px;
}
.title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 18px;
}
form {
    display: flex;
    flex-direction: column;
    gap: 18px;
}
.form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
}
.form-group input {
    border: none;
    border-radius: 20px;
    box-shadow: 0 2px 8px rgba(60, 60, 60, 0.3);
    padding: 10px 18px;
    font-size: 16px;
    outline: none;
    background: #fafafa;
}
button {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: none;
    background-color: #000;
    color: #fff;
    cursor: pointer;
}
button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}
.error-message {
    background-color: #ffe6e6;
    color: #e41e1e;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
}
.hint-block {
    margin-top: 20px;
    padding-top: 15px;
    border-top: 1px solid #eee;
}
.hint {
    font-size: 14px;
    color: #777;
    margin: 5px 0;
}
.auto-fill-btn {
    margin-top: 10px;
    background-color: #4caf50;
    font-size: 14px;
    padding: 5px;
}
.auto-fill-btn:hover {
    background-color: #45a049;
}
</style>
