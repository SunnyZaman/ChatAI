import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/:chatId?", component: () => import("../views/Home.vue"),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/sign-up", component: () => import("../views/Signup.vue"),
            meta: {
                disableIfLoggedIn: true
            }
        },
        {
            path: "/sign-in", component: () => import("../views/Signin.vue"),
            meta: {
                disableIfLoggedIn: true
            }
        },
        {
            path: "/:catchAll(.*)", component: () => import("../views/404.vue")
            
        }
    ]
});

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            getAuth(),
            (user) => {
                removeListener();
                resolve(user);
            },
            reject
        )
    })
}
router.beforeEach(async (to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (await getCurrentUser()) {
            next()
        } else {
            console.log("You don't have access");
            next("/sign-in")
        }
    }
    else if (to.matched.some((record) => record.meta.disableIfLoggedIn)) {
        if (!await getCurrentUser()) {
            next()
        } else {
            console.log("You are logged in already");
            next("/")
        }
    } else {
        next();
    }
})
export default router;