import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import ShopPage from '../views/ShopPage.vue'
import DetailPage from '../views/DetailPage.vue'
import CartPage from '../views/CartPage.vue'

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
      component: CartPage
    }
  ]
})

export default router
