import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Default from '../layouts/Default.vue';
import AuthLayout from '../layouts/AuthLayout.vue';
import Cookies from 'js-cookie';

const isAuthenticated = (): boolean => {
  const userAuthed = JSON.parse(localStorage.getItem('user')!);
  const userLoggedInToken = Cookies.get("user_logged_in_token");
  return (userLoggedInToken !== undefined && userLoggedInToken !== null) || (userAuthed !== undefined && userAuthed !== null);
};

const requireAuth = (to: any, from: any, next: any): void => {
  if (isAuthenticated()) {
    next();
  } else {
    next({ name: 'login' });
  }
};

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: Default,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/',
        name: "home",
        component: () => import("../views/HomeView.vue"),
      }
    ]
  },
  {
    path: "/profile",
    name: "profile",
    component: Default,
    meta: { requiresAuth: true },
    children: [
      {
        path: "/profile",
        name: "profile",
        component: () => import("../views/ProfileView.vue"),
      }
    ]
  },
  {
    path: "/login",
    component: AuthLayout,
    children: [
      {
        path: "/login",
        name: "login",
        component: () => import("../views/LoginView.vue"),
      }
    ]
  },
  {
    path: "/register",
    component: AuthLayout,
    children: [
      {
        path: "/register",
        name: "register",
        component: () => import("../views/RegisterView.vue"),
      }
    ]
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    requireAuth(to, from, next);
  } else {
    next();
  }
});

export default router;
