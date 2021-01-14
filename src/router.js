import Vue from 'vue'
import Router from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout'
import AuthLayout from '@/layout/AuthLayout'
import fb from "firebase";
Vue.use(Router)

const router = new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: 'home',
      component: DashboardLayout,
      meta: { requiresAuth: true },
      props:true,
      children: [
        {
          path: '/home',
          name: 'Home',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "demo" */ './views/Dashboard.vue')
        },
        {
          path: '/noticias/adicionar-noticia',
          name: 'Adicionar-Noticia',
          component: () => import(/* webpackChunkName: "demo" */ './views/AdicionarNoticia.vue')
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import(/* webpackChunkName: "demo" */ './views/UserProfile.vue')
        },
        {
          path: '/noticias',
          name: 'Noticias',
          component: () => import(/* webpackChunkName: "demo" */ './views/ListarNoticias.vue')
        },
        {
          path: '/aplications',
          name: 'Aplicações',
          component: () => import(/* webpackChunkName: "demo" */ './views/Aplications.vue')
        },
        {
          path: '/credits',
          name: 'Créditos',
          component: () => import(/* webpackChunkName: "demo" */ './views/Creditos.vue')
        },
      ]
    },
    {
      path: '/login',
      redirect: 'login',
      component: AuthLayout,
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import(/* webpackChunkName: "demo" */ './views/Login.vue')
        },
      ]
    }
    ,
    {
      path: '*',
      name: 'NotFound',
      component: () => import(/* webpackChunkName: "demo" */ './views/NotFound.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
    const requiresAuth= to.matched.some(x => x.meta.requiresAuth);
    const currentUser=fb.auth().currentUser
    
    if (requiresAuth && !currentUser) {
      next('/login')
    } else if(requiresAuth && currentUser) {
      next()
    }else{
      next()
    }
})

export default router
