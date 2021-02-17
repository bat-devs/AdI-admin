import Vue from 'vue';
import Router from 'vue-router';
import DashboardLayout from '@/layout/DashboardLayout';
import AuthLayout from '@/layout/AuthLayout';
import store from '@/store/index';
Vue.use(Router);

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
          requiresAuth: true,
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "demo" */ './views/Dashboard.vue')
        },
        {
          path: '/noticias/adicionar-noticia',
          name: 'Adicionar Notícia',
          requiresAuth: true,
          component: () => import(/* webpackChunkName: "demo" */ './views/AdicionarNoticia.vue')
        },
        {
          path: '/noticias',
          name: 'Notícias',
          requiresAuth: true,
          component: () => import(/* webpackChunkName: "demo" */ './views/ListarNoticias.vue')
        },
        {
          path: '/gestao-de-contas',
          name: 'Gestão de Contas',
          requiresAuth: true,
          component: () => import(/* webpackChunkName: "demo" */ './views/GestaoContas.vue')
        },
        {
          path: '/aplicacoes',
          name: 'Simulações de aplicaçõs',
          requiresAuth: true,
          component: () => import(/* webpackChunkName: "demo" */ './views/Aplications.vue')
        },
        {
          path: '/creditos',
          name: 'Simulações de créditos',
          requiresAuth: true,
          component: () => import(/* webpackChunkName: "demo" */ './views/Credits.vue')
        },
        {
          path: '/aplications-credits',
          name: 'Simulações de aplicações e créditos',
          requiresAuth: true,
          component: () => import(/* webpackChunkName: "demo" */ './views/AplicationsCredits.vue')
        },
        {
          path: '/gestores',
          name: 'Gestores',
          requiresAuth: true,
          component: () => {
            const isAdmin = store.state.role === 0;
            if(isAdmin) return import(/* webpackChunkName: "demo" */ './views/Gestores.vue');
            else import(/* webpackChunkName: "demo" */ './views/NotAccess.vue');
          }
        },
        {
          path: '/gestores/adicionar-gestor',
          name: 'Adicionar Gestor',
          requiresAuth: true,
          component: () => { 
            const isAdmin = store.state.role === 0;
            if(isAdmin) return import(/* webpackChunkName: "demo" */ './views/AdicionarGestor.vue');
            else return import(/* webpackChunkName: "demo" */ './views/NotAccess.vue');
          }
        },
        {
          path: '/transactions/:id',
          name: 'Transações',
          requiresAuth: true,
          component: () => import(/* webpackChunkName: "demo" */ './views/Transactions.vue')
        },
        {
          path: '/mudar-palavra-passe',
          name: 'Mudar Palavra-Passe',
          requiresAuth: true,
          component: () => import(/* webpackChunkName: "demo" */ './views/MudarPalavraPasse.vue')
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
          requiresAuth: false,
          component: () => import(/* webpackChunkName: "demo" */ './views/Login.vue')
        },
      ]
    },
    {
      path: '*',
      name: 'NotFound',
      component: () => import(/* webpackChunkName: "demo" */ './views/NotFound.vue')
    }
  ]
})

router.beforeEach((to, _from, next) => {
    const requiresAuth= to.matched.some(x => x.meta.requiresAuth);
    const currentUserEmail = sessionStorage.getItem('email');

    if (requiresAuth && !currentUserEmail) {
      next('/login')
    } else if(requiresAuth && currentUserEmail) {
      next()
    } else if(!requiresAuth && currentUserEmail){
      next('/home')
    }
    else {
      next();
    }
})

export default router;
