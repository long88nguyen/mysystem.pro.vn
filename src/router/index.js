import { createRouter, createWebHistory } from "vue-router";
import auth from "./modules/auth";
import chat from "./modules/chat";
import { authStore } from "../store";
import artificial_intelligence from "./modules/artificial_intelligence";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: () => import('../views/Dashboard.vue'),
            name: 'Dashboard',
            meta: {
                requiresAuth: true,
            },
            children: [
              {
                path: "/home",
                name: "Home",
                component: () => import('../views/pages/employees/Index.vue'),
              },
              ...chat,
              ...artificial_intelligence,
              {
                path: "/notifications",
                name: "Notifications",
                component: () => import('../views/pages/notifications/Notifications.vue'),
              },
            ],

        },
        //   {
        //     path: '/:pathMatch(.*)*',
        //     component: () => import('../views/pages/PageNotFound.vue'),
        //   },
        ...auth

    ]
})

router.beforeEach((to, from, next) => {
    const auth = authStore();
    if (to.path === '/login') {
        if (auth.isLogin) {
            next('/');
        } else {
            next();
        }
    } else {
        if (to.matched.some((record) => record.meta.requiresAuth)) {
            if (!auth.isLogin) {
                next('/login');
            } else {
                next();
            }
        } else {
            next();
        }
    }
});

export default router
