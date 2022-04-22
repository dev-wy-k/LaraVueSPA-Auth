import router from '../../routes';
import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        message: "Hello Member !",
        user: {},
        authenticated: false
    },
    getters: {
        getMessage(state) {
            return state.message;
        },
        getUser(state) {
            return state.user;
        },
        getAuthencation(state) {
            return state.authenticated
        }
    },
    mutations: {
        SET_USER(state, data) {
            state.user = data;
        },
        SET_AUTHENTICATION(state, data) {
            state.authenticated = data
        }
    },
    actions: {
        authUser({ commit, dispatch }) {
            return axios.get('/api/user').then((response) => {
                commit('SET_AUTHENTICATION', true)
                commit('SET_USER', response.data)
                localStorage.setItem("auth", true);

                if (router.currentRoute.name !== null) {
                    router.push({ name: 'Profile' })
                };

            }).catch(() => {
                commit('SET_AUTHENTICATION', false)
                commit('SET_USER', null)
                localStorage.removeItem("auth");

                if (router.currentRoute.name !== 'login') {
                    router.push({ name: 'Login' })
                };
            })
        },
    }
})

export default store