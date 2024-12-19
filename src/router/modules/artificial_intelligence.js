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
    },

    {
        path: '/artificial-intelligence/text-to-speech',
        name: 'TextToSpeech',
        component: () => import('../../views/pages/artificial-intelligence/TextToSpeech.vue')
    },

    {
        path: '/artificial-intelligence/pronoun-check',
        name: 'PronounCheck',
        component: () => import('../../views/pages/artificial-intelligence/PronounCheck.vue')
    },

    {
        path: '/artificial-intelligence/list-chat-room',
        name: 'ListChatRoom',
        component: () => import('../../views/pages/artificial-intelligence/ListChatRoom.vue')
    },

    {
        path: '/artificial-intelligence/create-chat-room',
        name: 'CreateRoom',
        component: () => import('../../views/pages/artificial-intelligence/CreateRoom.vue')
    },
]