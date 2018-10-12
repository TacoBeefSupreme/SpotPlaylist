<template>
    <div >
        <nav class="navbar navbar-light navbar-fixed-top" style="background-color: #e3f3fd;"> 
            <router-link to="/" class="navbar-brand">SpotPlaylist</router-link>
            <div class="justify-content-end">
                <button type="button" class="btn btn-outline-primary authButtons" @click="signIn">Sign In</button>
                <button type="button" class="btn btn-outline-primary authButtons" @click="signUp">Sign Up</button>
                <button type="button" class="btn btn-outline-primary authButtons" @click="logout">Logout</button>
            </div>
        </nav> 
    </div>

</template>

<script>


export default {
    name: 'navBar',
    methods: {
        signIn() {
            this.$router.push({path: '/signin'});
        },
        signUp() {
            this.$router.push({path: '/signup'});
        },
        logout() {
            this.$router.push({path: '/'});
        }
    }
}
</script>

<style scoped>
    .authButtons{
        margin-left: 10px
    }


</style>
