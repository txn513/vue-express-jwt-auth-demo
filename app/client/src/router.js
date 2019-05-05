import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import Home from 'views/home.vue'
import Login from 'views/login.vue'
import Register from 'views/register.vue'

Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        component: Home,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/register',
        component: Register
    }
]

const router = new VueRouter({
    routes
});


router.beforeEach((to, from, next) => {
    if (to.matched.some(r => r.meta.requireAuth)) {
        if (store.state.token) {
            next();
        }
        else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}
            })
        }
    }
    else {
        next();
    }
})

export default router