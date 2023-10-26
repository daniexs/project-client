import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import ShopPage from '../views/ShopPage.vue'
import DetailPage from '../views/DetailPage.vue'
import CartPage from '../views/CartPage.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import FormPage from '../views/FormPage.vue'
import CheckoutPage from '../views/CheckoutPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/shop',
      name: 'shop',
      component: ShopPage
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: DetailPage
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartPage,
      beforeEnter: (to,from) => {
        if(!localStorage.access_token){
          return {name: 'login'}
        }
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/add',
      name: 'add',
      component: FormPage
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: CheckoutPage
    },
    
  ]
})

router.beforeEach(async (to, from) => {
  if (
    // make sure the user is authenticated
    localStorage.access_token && (to.name == 'login' || to.name == 'register')
  ) {
    // redirect the user to the login page
    return { name: 'home' }
  }
})

export default router
