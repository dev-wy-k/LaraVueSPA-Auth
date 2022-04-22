import Vue from 'vue';
import Router from 'vue-router'
import Home from './components/home';
import About from './components/about';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Profile from './components/dashboard/Profile';
Vue.use(Router)

export default new Router({
    mode: 'history',
    linkActiveClass: 'now',
    routes: [
        { path: '/', component: Home, name: 'Home' },
        { path: '/about', component: About, name: 'About' },
        { path: '/register', component: Register, name: 'Register' },
        { path: '/login', name: 'Login', component: Login },
        { path: '/profile', component: Profile, name: 'Profile' },
    ]
})