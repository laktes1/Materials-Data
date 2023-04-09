import {createRouter, createWebHistory} from 'vue-router'
import main from '../pages/Main.vue'
import materialInformation from '../pages/MaterialInformation.vue'

const routes = [
    {
        path: '/',
        component: main,
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