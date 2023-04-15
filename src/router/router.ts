import {createRouter, createWebHistory} from 'vue-router'
import CIFPage from '../pages/CIF-Page.vue'
import OUTPage from '../pages/OUT-Page.vue'
import materialInformation from '../pages/MaterialInformation.vue'

const routes = [
    {
        path: '/',
        component: CIFPage,
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
        path: '/materialInfo',
        component: materialInformation,
    },
]

const router = createRouter({
    routes,
    history: createWebHistory('/'),
})

export default router;