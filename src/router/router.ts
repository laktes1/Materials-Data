import {createRouter, createWebHistory} from 'vue-router'
import CIFPage from '../pages/CIF.vue'
import OUTPage from '../pages/OUT.vue'
import FilesPage from '../pages/Files.vue'
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
        path: '/filesPage',
        component: FilesPage,
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