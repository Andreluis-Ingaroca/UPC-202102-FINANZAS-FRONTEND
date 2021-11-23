import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/login')
  },
  {
    path: '/letras-registradas/:id',
    name: 'letras-registradas',
    component: () => import('../components/letras-registradas')
  },
  {
    path: '/calculadora-letras',
    name: 'calculadora-letras',
    component: () => import('../components/calculadora-letras')
  },
  {
    path: '/cartera-letras/:carteraId/operacion/:operacionId',
    name: 'cartera-letras',
    component: () => import('../components/cartera-letras')
  },
  {
    path: '/',
    name: 'carteras-registradas',
    component: () => import('../components/carteras-registradas')
  },
  {
    path: '/operaciones-registradas/:id',
    name: 'operaciones-registradas',
    component: () => import('../components/operaciones-registradas')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
