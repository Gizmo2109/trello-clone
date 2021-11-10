import Vue from 'vue'
import Router from 'vue-router'
import Board from './views/Board.vue'
import Task from './views/Task.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/board/:boards',
      name: 'board',
      component: Board,
      props: true,
      children: [
        {
          path: 'task/:id',
          name: 'task',
          component: Task
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
