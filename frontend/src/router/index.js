import Vue from 'vue'
import VueRouter from 'vue-router'
import authService from '../service/auth-service'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "signup" */ '../views/Login.vue')
  },
  {
    path: '/signup/:token',
    name: 'Signup',
    component: () => import(/* webpackChunkName: "signup" */ '../views/Signup.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/add',
    name: 'Add Product',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/AddProduct.vue'),
    meta: {
      requireAuth: true
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth && to.name !== 'Login' && !authService.isLoggedIn()){
    next({ name: 'Login' })
  }else if(authService.isLoggedIn() && ['Login', 'Signup', 'Home'].indexOf(to.name) !== -1){
    next({ name: 'Dashboard' })
  }else{
    next()
  }
})

export default router
