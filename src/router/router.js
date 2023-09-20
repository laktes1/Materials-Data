import {createRouter, createWebHistory} from 'vue-router'
import MainPage from '@/pages/Main.vue'
import CIFPage from '@/pages/CIF.vue'
import OUTOptPage from '@/pages/outOptimization.vue'
import OUTHessPage from '@/pages/outHessian.vue'
import OUTRamPage from '@/pages/outRaman.vue'
import OUTSPPage from '@/pages/outSP.vue'
import FilesPage from '@/pages/Files.vue'
import OtherTypesPage from '@/pages/OtherTypes.vue'

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
        path: '/outOptPage',
        component: OUTOptPage,
    },
    {
        path: '/outHessPage',
        component: OUTHessPage,
    },
    {
        path: '/outRamPage',
        component: OUTRamPage,
    },
    {
        path: '/outSPPage',
        component: OUTSPPage,
    },
    {
        path: '/otherTypesPage',
        component: OtherTypesPage,
    },
    {
        path: '/filesPage',
        component: FilesPage,
    },
    // {
    //     path: '/:pathMatch(.*)*',
    //     name: '404',
    //     component: NotFoundPage,
    // }
]

const router = createRouter({
    routes,
    history: createWebHistory('/'),
})

export default router;