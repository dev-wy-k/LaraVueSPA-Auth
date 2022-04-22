<template>
  <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light bg-light p-3">
        <h4 class="navbar-brand">LaraVue-Auth</h4>
        <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
        >
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
            <li class="nav-item">
            <router-link class="nav-link" to="/" exact
                >Home</router-link
            >
            </li>
            
            <li class="nav-item">
            <router-link class="nav-link" to="/about">About</router-link>
            </li>
            <li class="nav-item">
            <router-link class="nav-link" to="/register" v-if="!auth">Register</router-link>
            </li>
            <li class="nav-item">
            <router-link class="nav-link" to="/login" v-if="!auth">Login</router-link>
            </li>
            <li class="nav-item">
            <router-link class="nav-link"  to="/profile" v-if="auth">Profile</router-link>
            </li>
            <li class="nav-item">
            <a class="nav-link logout-btn" @click.prevent="logout" v-if="auth">Logout</a>
            </li>
        </ul>
        </div>
    </nav>
  </div>
</template>

<script>
import router from '../routes'

export default {
  name: "NavBar",
  computed: {
    auth() {
      return this.$store.getters.getAuthencation 
    }
  },
  methods: {
    logout() {
       axios.post('/logout')
       .then((res)=>{
         this.$store.commit('SET_USER', {})
         this.$store.commit('SET_AUTHENTICATION', false);
         router.push({name: 'Login'})
         Toast.fire({
            icon: 'success',
            title: 'Logout Successfully'
          })
       }) 
    }
  },
};
</script>

<style lang="scss" scoped>
</style>