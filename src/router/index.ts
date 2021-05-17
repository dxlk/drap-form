import { createRouter, createWebHashHistory } from 'vue-router'

import FormDiy from '../views/FormDiy/FormDiy.vue'
const routes = [{ //只是进行路由的配置
    path: '/',
    component: () => import('../views/login/Login.vue') //这种形式就属于路由的懒加载
}, { //只是进行路由的配置
    path: '/home',
    component: () => import('../views/home/Home.vue') //这种形式就属于路由的懒加载
}, {
    path: '/appManager',
    name: '/appManager',
    component: () => import('../views/dashboard/index.vue'),//这种形式就属于路由的懒加载

}, {
    path: '/indexDiy',
    component: () => import('../views/dashboard/indexDiy.vue'),//这种形式就属于路由的懒加载
    children: [{
        path: 'form',
        name: 'form',
        component: FormDiy,
    }]
}]

export default createRouter({
    history: createWebHashHistory(),
    routes: routes
})