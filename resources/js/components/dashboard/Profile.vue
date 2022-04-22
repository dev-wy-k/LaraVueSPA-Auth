<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8">
                <h1>This is Profile</h1>
                <h4>Welcoome {{ user.name }}</h4>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Profile',
        computed :{
            user(){
                return this.$store.getters.getUser
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>