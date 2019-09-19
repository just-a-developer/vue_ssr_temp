import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

export function createRouter () {
    return new Router({
        mode: "history",
        routes: [
            {
                path: '/:city?/',
                name: 'index',
                component: () => import(/* webpackChunkName: "index" */ '../views/Index.vue')
            },
            {
                path: '*',
                redirect: { name: "index" }
            }
        ]
    })
}