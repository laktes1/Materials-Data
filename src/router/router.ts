import {createRouter, createWebHistory} from 'vue-router'
import MainPage from '@/pages/Main.vue'
import CIFPage from '@/pages/CIF.vue'
import OUTPage from '@/pages/OUT.vue'
import FilesPage from '@/pages/Files.vue'
import Test from '@/pages/Test.vue'
import materialInformation from '@/pages/MaterialInformation.vue'

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
    {
        path: '/materialInfo',
        component: materialInformation,
    },
    {
        path: '/testPage',
        component: Test,
    },
]

const router = createRouter({
    routes,
    history: createWebHistory('/'),
})

export default router;