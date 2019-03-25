<template>
    <mu-container>

        <mu-card style="width: 100%; max-width: 375px; margin: 0 auto;">
     
        <mu-card-title title="Login" ></mu-card-title>
        <mu-card-text>
<mu-text-field v-model="username" :error-text="usernameErr" label="Username"></mu-text-field><br/>
<mu-text-field v-model="password" :error-text="passwordErr" label="Password" :action-icon="visibility ? 'visibility_off' : 'visibility'" :action-click="() => (visibility = !visibility)" :type="visibility ? 'text' : 'password'"></mu-text-field><br/>
        </mu-card-text>
        <mu-card-actions>
            <mu-button color="primary" @click="goLogin">Login</mu-button>
            <p class="register" @click="goToRegister">Register</p>
        </mu-card-actions>
        </mu-card>
    </mu-container>
</template>
<script>
import { getTest } from '../api'

export default {
    
    data(){
        return {
            visibility: false,
            username: '',
            password: '',
            usernameErr: '',
            passwordErr: ''
        }
    },
    methods: {
        goToRegister(){
            this.$router.push('/register')
        },
        goLogin(){
            this.usernameErr = this.passwordErr = ''
            if (!this.username) {
                this.usernameErr = 'please enter a username'
                return
            }
            if(!this.password){
                this.passwordErr = 'please enter a password'
                return
            }

            this.$store.dispatch('login', {
                username: this.username,
                password: this.password
            })
            .then((res) => {if (res.data.success) this.$router.push('/')})
            .catch(err => console.log(err))
            
            
        }
    },
    created(){

    }
}
</script>
<style lang="scss" scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: calc(100vh - 80px);
    .mu-card {
        text-align: center;
        .mu-card-title {
            text-align: center;
        }
        .mu-card-actions {
            .register {
                text-decoration: underline;
                color: #888;
                cursor: pointer;
            }
        }
    }
}
</style>
