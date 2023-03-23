import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/MainView.vue'
import RedirectView from "@/views/RedirectView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'redirect',
      component: RedirectView,
    },
    {
      path: '/household/:householdId',
      name: 'main',
      component: HomeView,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/HomeView.vue')
        },
        {
          path: 'recipes',
          name: 'recipes',
          component: () => import('../views/RecipesView.vue')
        },
        {
          path: 'recipes/:recipeId',
          name: 'recipe',
          component: () => import('../views/RecipeView.vue')
        }
      ]
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: () => import('../views/SignUpView.vue')
    },
    {
      path: '/welcome-wizard',
      name: 'welcome-wizard',
      component: () => import('../views/WelcomeWizard.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/MainView.vue')
    }
  ]
})

export default router
