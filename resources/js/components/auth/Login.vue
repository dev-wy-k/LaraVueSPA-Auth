<template>
    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <h3 class="py-3 text-center font-weight-bold">Login Account</h3>
                <div class="card">
                    <div class="card body py-5">                  

                        <form @submit.prevent="login">                            

                            <div class="row mb-3">
                                <label for="email" class="col-md-4 col-form-label text-md-end">Your Email</label>

                                <div class="col-md-6">
                                    <input id="email" v-model="loginForm.email" type="email" class="form-control"  :class="{ 'is-invalid' : loginForm.errors.has('email') }" >
                                    <HasError :form="loginForm" field="email" ></HasError>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <label for="password" class="col-md-4 col-form-label text-md-end">Password</label>

                                <div class="col-md-6">
                                    <input id="password" v-model="loginForm.password" type="password" class="form-control" :class="{ 'is-invalid' : loginForm.errors.has('password') }">
                                    <HasError :form="loginForm" field="password" ></HasError>
                                </div>

                            </div>

                            <div class="row mb-0">
                                <div class="col-md-6 offset-md-4">
                                    <button type="submit" class="btn btn-primary">
                                        Login
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import router from '../../routes'

    export default {
        name: 'Login',
        data() {
            return {
                loginForm: new Form ({
                    email: '',
                    password: '',
                })
            }
        },
        methods: {
            login() {
                axios.get('/sanctum/csrf-cookie').then(response => {
                    this.loginForm.post('/login')
                    .then((result) => {                    
                    this.formData =  {
                        email: '',
                        password: '',
                    } ;
                    this.getUser();
                    Toast.fire({
                        icon: 'success',
                        title: 'Login Successfully'
                    })
                    router.push({name: 'Profile'})
                    })
                    .catch((err) => {
                        this.error = err.response.data.message
                    });
                });                
            },
            getUser(){
                axios.get('/api/user')
                .then((result) => {
                    let user = result.data ;
                    this.$store.commit('SET_USER', user);
                    this.$store.commit('SET_AUTHENTICATION', true);

                    localStorage.setItem("auth", true);
                })
            }
        },
        mounted(){
            
        }
    }
</script>