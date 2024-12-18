export default [
    {
        path: '/artificial-intelligence',
        name: 'ArtificialIntelligence',
        component: () => import('../../views/pages/artificial-intelligence/ArtificialIntelligence.vue')
    },
    {
        path: '/artificial-intelligence/assistant',
        name: 'AIAssistant',
        component: () => import('../../views/pages/artificial-intelligence/AIAssistant.vue')
    }
]