import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

export const router = new VueRouter({
    routes: [
        {
            path: '/admin-login',
            name: 'admin-login',
            component: () => import('@/views/admin/AdminLogin'),
            meta: {
                layout: 'blank',
            },
        },
        {
            path: '/admin',
            name: 'admin',
            component: () => import('@/views/admin/Admin'),
            meta: {
                layout: 'admin',
            },
        },
        ],
    mode: 'history',
})