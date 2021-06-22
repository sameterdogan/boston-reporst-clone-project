import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store/store";


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
            component: () => import('@/views/admin/AdminHome'),
            meta: {
                layout: 'admin',
                is_admin: true,
            },
        },
    ],
    mode: 'history',
})
router.beforeEach((to, from, next) => {
    let admin = store.getters.getAdmin
    if (to.matched.some(record => record.meta.is_admin)) {

        if (store.getters.authenticated === null) {
            console.log("authanticated yoktu")
            next({
                path: '/admin-login',
                params: {nextUrl: to.fullPath},
            })
        } else{
            if(!admin){
                console.log("admin yoktu")
                next({
                    path: '/admin-login',
                    params: {nextUrl: to.fullPath},
                })
            }else{
                return next()
            }

        }

    } else {
        return next()
    }

})