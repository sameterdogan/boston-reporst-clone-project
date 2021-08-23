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
                title: '098'
            },
        },
        {
            path: '/reports-by-sub-category/:subCategoryId',
            name: 'reports-by-sub-category',
            component: () => import('@/views/index/ReportsBySubCategory'),
            meta: {
                layout: 'default',
                title: '098'
            },
        },
        {
            path: '/new-report/select-category',
            name: 'new-report-select-category',
            component: () => import('@/views/index/NewReportSelectCategory'),
            meta: {
                layout: 'default',
                title: '098'
            },
        },
        {
            path: '/new-report/:categoryId/:subCategoryId',
            name: 'new-report',
            component: () => import('@/views/index/NewReport'),
            meta: {
                layout: 'default',
                title: '098'
            },
        },
        {
            path: '/reports/:reportId',
            name: 'report-detail',
            component: () => import('@/views/index/ReportDetail'),
            meta: {
                layout: 'default',
                title: '098'
            },
        },
        {
            path: '/admin-login',
            name: 'admin-login',
            component: () => import('@/views/admin/AdminLogin'),
            meta: {
                layout: 'blank',
                title: '098'
            },
        },
        {
            path: '/admin',
            name: 'admin-home',
            component: () => import('@/views/admin/AdminCategory'),
            meta: {
                layout: 'admin',
                is_admin: true,
                title: '098'
            },
        },
        {
            path: '/admin-categories',
            name: 'admin-categories',
            component: () => import('@/views/admin/AdminCategory'),
            meta: {
                layout: 'admin',
                is_admin: true,
                title: '098'
            },
        },
        {
            path: '/admin-admins',
            name: 'admin-admins',
            component: () => import('@/views/admin/Admins'),
            meta: {
                layout: 'admin',
                is_admin: true,
                title: '098'
            },
        },
        {
            path: '/admin/reports/active-reports',
            name: 'admin-active-reports',
            component: () => import('@/views/admin/AdminActiveReport'),
            meta: {
                layout: 'admin',
                is_admin: true,
                title: '098'
            },
        },
        {
            path: '/admin/reports/waiting-reports',
            name: 'admin-waiting-reports',
            component: () => import('@/views/admin/AdminWaitingReport'),
            meta: {
                layout: 'admin',
                is_admin: true,
                title: '098'
            },
        },
        {
            path: '/admin/reports/solved-reports',
            name: 'admin-solved-reports',
            component: () => import('@/views/admin/AdminSolvedReport'),
            meta: {
                layout: 'admin',
                is_admin: true,
                title: '098'
            },
        },
        {
            path: '/employee-login',
            name: 'employee-login',
            component: () => import('@/views/admin/AdminLogin'),
            meta: {
                layout: 'blank',
                title: '098'
            },
        },
        {
            path: '/employee',
            name: 'employee',
            component: () => import('@/views/employee/EmployeeActiveReport'),
            meta: {
                layout: 'blank',
                title: '098',
                is_employee:true
            },
        },
        {
            path: '/403',
            name: '403',
            component: () => import('@/views/error/403'),
            meta: {
                layout: 'blank',
                title: '098'
            },
        },
        {
            path: '/401',
            name: '401',
            component: () => import('@/views/error/401'),
            meta: {
                layout: 'blank',
                title: '098'
            },
        },
        {
            path: '/500',
            name: '500',
            component: () => import('@/views/error/500'),
            meta: {
                layout: 'blank',
                title: '098'
            },
        },
        {
            path: '*',
            name: '404',
            component: () => import('@/views/error/404'),
            meta: {
                layout: 'blank',
                title: '098'
            },
        },
    ],
    mode: 'history',
})
router.beforeEach((to, from, next) => {
    let admin = store.getters.getAdmin
    if (to.matched.some(record => record.meta.is_admin)) {
          console.log("geliyo")
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

    } else if (to.matched.some(record => record.meta.is_employee)) {

        let admin = store.getters.getAdmin
         console.log(store.getters.authenticated)
        if (store.getters.authenticated === null || admin.role!=="employee")  {

            next({
                path: '/employee-login',
                params: {nextUrl: to.fullPath},
            })
        } else {
            if (!admin) {
                next({
                    path: '/employee-login',
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