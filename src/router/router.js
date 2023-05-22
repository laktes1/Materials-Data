import {createRouter, createWebHistory} from 'vue-router'
import MainPage from '@/pages/Main.vue'
import CIFPage from '@/pages/CIF.vue'
import OUTPage from '@/pages/OUT.vue'
import FilesPage from '@/pages/Files.vue'

const routes = [
    {
        path: '/',
        component: MainPage,
    },
    {
        path: '/cifPage',
        component: CIFPage,
    },
    {
        path: '/outPage',
        component: OUTPage,
    },
    {
        path: '/filesPage',
        component: FilesPage,
    },
    // TODO redirect 404
    // {
    //     path: '/:pathMatch(.*)*',
    //     name: '404',
    //     component: NotFoundView
    // }
]

const router = createRouter({
    routes,
    history: createWebHistory('/'),
})

export default router;