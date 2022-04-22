require('./bootstrap');

window.Vue = require('vue').default;
import Vue from 'vue';
import VueRouter from 'vue-router';
import router from "./routes"
import store from './components/store';
import NavBar from "./components/NavBar"
import Form from 'vform'
import { HasError, AlertError } from 'vform/src/components/bootstrap5';
import Swal from 'sweetalert2/dist/sweetalert2.js'

window.Form = Form;
window.HasError = HasError;
window.AlertError = AlertError;
window.Swal = Swal;
Vue.use(VueRouter);

Vue.component(HasError.name, HasError);
Vue.component(AlertError.name, AlertError);

// check authentication
let auth = localStorage.getItem("auth");

if (auth) {
    store.dispatch('authUser').then(() => {
        const app = new Vue({
            el: '#app',
            router,
            store,
            components: {
                NavBar
            }
        });
    });
} else {
    const app = new Vue({
        el: '#app',
        router,
        store,
        components: {
            NavBar
        }
    });
}

window.Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})