import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import UsersView from '@/views/UsersView.vue'
import ProfileView from '@/views/ProfileView.vue'
import NotFoundView from '@/views/NotFoundView.vue'


import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from '@/services/auth'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', component: HomeView },
        {
            path: '/login',
            component: LoginView,
            meta: { redirectIfAuth: true },
        },
        { path: '/users', component: UsersView },
        {
            path: '/profile',
            component: ProfileView,
            meta: { requiresAuth: true },
        },
        { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView },
    ],
})


router.beforeEach((to, from, next) => {
    const auth = isAuthenticated()

    if (to.meta.requiresAuth && !auth) {
        next('/login')
    } else if (to.meta.redirectIfAuth && auth) {
        next('/')
    } else {
        next()
    }
})

export default router
