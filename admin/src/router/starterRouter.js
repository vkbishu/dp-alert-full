import Vue from 'vue';
import Router from 'vue-router';
import DashboardLayout from '../layout/starter/SampleLayout.vue';
import Login from "@/views/Login.vue";
import Starter from '../layout/starter/SamplePage.vue';
import authService from '../service/auth-service'
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/dashboard',
      component: DashboardLayout,
      children: [
        {
          path: '',
          name: 'dashboard',
          component: Starter,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/product',
          name: 'product',
          component: () => import(/* webpackChunkName: "admin-common" */"@/views/Product/ProductList.vue"),
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/product/add',
          name: 'add_product',
          component: () => import(/* webpackChunkName: "admin-common" */"@/views/Product/EditProduct.vue"),
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/product/:id',
          name: 'edit_product',
          component: () => import(/* webpackChunkName: "admin-common" */"@/views/Product/EditProduct.vue"),
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/product/:id/alerts',
          name: 'alerts',
          component: () => import(/* webpackChunkName: "admin-common" */"@/views/User/ProductUser.vue"),
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/user',
          name: 'user',
          component: () => import(/* webpackChunkName: "admin-common" */"@/views/User/UserList.vue"),
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/setting',
          name: 'setting',
          component: () => import(/* webpackChunkName: "admin-common" */"@/views/Setting/Setting.vue"),
          meta: {
            requireAuth: true
          }
        },
      ]
    },
    { path: "*", component: NotFound },
  ],

  linkExactActiveClass: "active",
  scrollBehavior: (to) => {
    if (to.hash) {
      return {selector: to.hash}
    } else {
      return { x: 0, y: 0 }
    }
  }
});

router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.requireAuth && to.name !== 'Login' && !authService.isLoggedIn()){
    next({ name: 'Login' })
  }else if(authService.isLoggedIn() && ['Login'].indexOf(to.name) !== -1){
    next({ path: '/dashboard' })
  }else{
    next()
  }
});

export default router;
