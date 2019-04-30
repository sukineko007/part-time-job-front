import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import studentManage from '../components/studentManage'
import enterpriseManage from '../components/enterpriseManage'
import recruitInfo from '../components/recruitInfo'
import jobWanted from '../components/jobWanted'
import employInfo from '../components/employInfo'
import employRecommend from '../components/employRecommend'
import welcome from '../components/welcome'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            component: Login,
        },

      {
            path: '/Home',
            component: Home,
            redirect: { path: '/1' },
            children: [
              {
                path:'/1',
                component:welcome
              },
                {
                    path: '/0',
                    component: studentManage
                },
                {
                  path: '/2',
                  component:enterpriseManage
                },
               {
                    path: '/3',
                    component: recruitInfo
                }, {
                    path: '/4',
                    component: jobWanted
                }, {
                    path: '/5',
                    component: employInfo
                }, {
                    path: '/6',
                    component: employRecommend
                }
            ]
        }
    ]
})
