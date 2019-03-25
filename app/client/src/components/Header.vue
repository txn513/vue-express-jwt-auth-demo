<template>
    <mu-appbar style="width: 100%;">
        <!-- <mu-button icon slot="left">
            <mu-icon value="menu"></mu-icon>
        </mu-button> -->
        <router-link to="/">X-Blog</router-link>
        <mu-button flat slot="right" @click="logout" v-if="$store.getters.isLoggedIn">Logout</mu-button>
        <mu-button flat slot="right" @click="$router.push('/login')" v-else>Login</mu-button>
        
        </mu-appbar>
</template>
<script>
export default {
    
}
</script>
<script>
export default {
    data(){
        return {

        }
    },
    methods: {
        logout(){
            this.$store.dispatch('logout').then(()=> {
                this.$router.push('/login')
            })
        }
    }
}
</script>

<style lang="scss">
.header {
    height: 80px
}
</style>
