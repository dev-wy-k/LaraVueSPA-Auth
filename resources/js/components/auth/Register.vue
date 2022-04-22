<template>
    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <h3 class="py-3 text-center font-weight-bold">Register Account</h3>
                <div class="card">
                    <div class="card body py-5">  
                        <form @submit.prevent="register">                   
                            <div class="row mb-3">
                                <label for="name" class="col-md-4 col-form-label text-md-end">Your Name</label>

                                <div class="col-md-6">
                                    <input id="name" v-model="registerForm.name" type="text" class="form-control" :class="{ 'is-invalid' : registerForm.errors.has('name') }" >
                                    <HasError :form="registerForm" field="name" ></HasError>

                                </div>
                            </div>

                            <div class="row mb-3">
                                <label for="email" class="col-md-4 col-form-label text-md-end">Your Email</label>

                                <div class="col-md-6">
                                    <input id="email" v-model="registerForm.email" type="email" class="form-control"  :class="{ 'is-invalid' : registerForm.errors.has('email') }" >
                                    <HasError :form="registerForm" field="email" ></HasError>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <label for="password" class="col-md-4 col-form-label text-md-end">Password</label>

                                <div class="col-md-6">
                                    <input id="password" v-model="registerForm.password" type="password" class="form-control" :class="{ 'is-invalid' : registerForm.errors.has('password') }">
                                    <HasError :form="registerForm" field="password" ></HasError>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <label for="password-confirm" class="col-md-4 col-form-label text-md-end">Confirm Password</label>

                                <div class="col-md-6">
                                    <input id="password-confirm" v-model="registerForm.password_confirmation" type="password" class="form-control" :class="{ 'is-invalid' : registerForm.errors.has('password_confirmation') }">
                                    <HasError :form="registerForm" field="password_confirmation" ></HasError>
                                </div>
                            </div>

                            <div class="row mb-0">
                                <div class="col-md-6 offset-md-4">
                                    <button type="submit" class="btn btn-primary">
                                        Register
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
        name: 'Register',
        data() {
            return {
                registerForm: new Form ({
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation : ''
                })
            }
        },
        methods: {
            register() {
                this.registerForm.post('/register')
                .then((res)=>{
                    this.formData = {
                        name: '',
                        email: '',
                        password: '',
                        password_confirmation : ''
                    }
                    Toast.fire({
                        icon: 'success',
                        title: 'Account Register Successfully'
                    })
                    router.push({name: 'Profile'})
                    this.getUser()
                })
                .catch((err)=>{
                    this.error = err.response.data.message
                })
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
    }
</script>

<style lang="scss" scoped>

</style>