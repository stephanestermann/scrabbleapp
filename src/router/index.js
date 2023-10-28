import Vue from 'vue'
import Router from 'vue-router'
import UebersichtsBereich from '@/components/UebersichtsBereich.vue'
import Statistik from '@/components/Statistik/Statistik.vue'
import Administration from '@/components/Administration/Administration.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'UebersichtsBereich',
      component: UebersichtsBereich
    },
    {
      path: '/statistik',
      name: 'Statistik',
      component: Statistik
    },
    {
      path: '/admin',
      name: 'AdministrationTools',
      component: Administration
    }
  ]
})