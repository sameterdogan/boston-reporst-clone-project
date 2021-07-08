import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store/store";


Vue.use(VueRouter)

export const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/index/Home'),
            meta: {
                layout: 'default',
            },
        },
        {
            path: '/new-report/select-category',
            name: 'new-report-select-category',
            component: () => import('@/views/index/NewReportSelectCategory'),
            meta: {
                layout: 'default',
            },
        },
        {
            path: '/new-report/:categoryId/:subCategoryId',
            name: 'new-report',
            component: () => import('@/views/index/NewReport'),
            meta: {
                layout: 'default',
            },
        },
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
            name: 'admin-home',
            component: () => import('@/views/admin/AdminHome'),
            meta: {
                layout: 'admin',
                is_admin: true,
            },
        },
        {
            path: '/admin-categories',
            name: 'admin-categories',
            component: () => import('@/views/admin/AdminCategory'),
            meta: {
                layout: 'admin',
                is_admin: true,
            },
        },
        {
            path: '/admin-reports',
            name: 'admin-reports',
            component: () => import('@/views/admin/AdminReport'),
            meta: {
                layout: 'admin',
                is_admin: true,
            },
        },
        {
            path: '*',
            name: '404',
            component: () => import('@/views/error/404'),
            meta: {
                layout: 'blank',
            },
        },
    ],
    mode: 'history',
})
router.beforeEach((to, from, next) => {
    let admin = store.getters.getAdmin
    if (to.matched.some(record => record.meta.is_admin)) {

        if (store.getters.authenticated === null) {

            next({
                path: '/admin-login',
                params: {nextUrl: to.fullPath},
            })
        } else {
            if (!admin) {
                next({
                    path: '/admin-login',
                    params: {nextUrl: to.fullPath},
                })
            } else {
                return next()
            }

        }

    } else {
        return next()
    }

})