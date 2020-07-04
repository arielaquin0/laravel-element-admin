import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

import Layout from '../layout';
const lazyLoading = (c) => require(`../views/${c}/index`).default

const staticRoutes = [
    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '/redirect/:path(.*)',
                component: () => import('../views/redirect/index')
            }
        ]
    },
    {
        path: '/login',
        component: () => import('../views/login'),
        hidden: true
    },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [
            {
                path: 'dashboard',
                component: () => import('../views/dashboard/index'),
                name: 'Dashboard',
                meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
            }
        ]
    },
    {
        path: '/icon',
        component: Layout,
        children: [
            {
                path: 'index',
                component: () => import('../views/icons/index'),
                name: 'Icons',
                meta: { title: 'Icons', icon: 'icon', noCache: true }
            }
        ]
    },
]

let items = [
    {
        path: '/link1',
        children: [
            {
                path: 'index',
                component: "link1",
                name: 'Link1',
                meta: { title: 'Link1', icon: 'link' }
            }
        ]
    },
    {
        path: '/link2',
        children: [
            {
                path: 'index',
                component: "link2",
                name: 'Link2',
                meta: { title: 'Link2', icon: 'link' }
            }
        ]
    }
];

const dynamicRoutes = [];
items.forEach(item => {
    const d = {
        path: item.path,
        component: Layout,
        name: 'test',
        children: [
            {
                path: item.children[0].path,
                component: lazyLoading(item.children[0].component),
                name: item.children[0].name,
                meta: { title: item.children[0].meta.title, icon: item.children[0].meta.icon }
            }
        ]
    }
    dynamicRoutes.push(d);
})

export const constantRoutes = staticRoutes

export const asyncRoutes = dynamicRoutes

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
