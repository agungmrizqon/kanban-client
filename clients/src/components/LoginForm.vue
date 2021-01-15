<template>
  
    <!-- ===== FORM LOGIN ===== -->
    <div 
        id="login" 
        class="container d-flex justify-content-center col-5 mt-3">

        <div 
            class="container card d-flex justify-content-center mt-5 bg-light">

            <form 
                method="POST" 
                v-on:submit.prevent="userLogin">

                <h3 
                    style="text-align: center;" 
                    class="m-3 border-bottom border-info"
                    >Welcome to Kanvan!</h3>
                
                <div 
                    class="mb-3">

                    <label 
                        for="email-login" 
                        class="form-label" 
                        >Email address</label>
                    
                    <input 
                        type="email" 
                        class="form-control" 
                        id="email-login" 
                        v-model="email">
                    
                    <div 
                        class="form-text"
                        >We'll never share your email with anyone else.</div>
                </div>
                <div 
                    class="mb-3">
                    
                    <label 
                        for="password-login" 
                        class="form-label"
                        >Password</label>
                    
                    <input 
                        type="password" 
                        class="form-control" 
                        id="password-login" 
                        v-model="password">

                </div>
                <div 
                    class="mb-3 d-flex justify-content-center">
                    <button 
                        type="submit" 
                        class="btn btn-primary" 
                        id="login-button"
                        >Submit</button>
                    
                    <a 
                        href="/" 
                        id="go-register"
                        class="btn btn-info" 
                        v-on:click.prevent="changePage('register')"
                        >Not Registered Yet?</a>

                    <button 
                        v-google-signin-button="clientId" 
                        class="btn btn-warning google-signin-button"
                        > Continue with Google</button>

                </div>
            </form>
        </div>
    </div>
    <!-- ===== END OF FORM LOGIN ===== -->
</template>

<script>
import GoogleSignInButton from "vue-google-signin-button-directive"
import axios from "../axiosInstance"

export default {
    name: "LoginForm",
    props: ["errorMessages"],
    directives: {
        GoogleSignInButton
    },
    data() {
        return {
            email: '',
            password: '',
            clientId: '987723010851-i7meisadeh172koabuvbeenu7tnjft99.apps.googleusercontent.com'
        }
    },
    methods: {
        userLogin () {
            /*
            - masuk ke server untuk di cek
            - set localStorage
            - pindah halaman main
            */
            this.$emit('userLogin', { email: this.email, password: this.password })
            this.email = '',
            this.password = ''
        },
        changePage(input) {  
           
            this.$emit("changePage", input)
        },
        OnGoogleAuthSuccess (id_token) {
            
            console.log(id_token)
            axios({
                method: "POST",
                url: `/users/googleUser`,
                data: { id_token }
            })
            .then (response => {
                console.log(response.data.access_token)
                localStorage.setItem("access_token", response.data.access_token)
                this.checkAuth()
            })
            .catch (err => {
                console.log(err)
            })
        },
        OnGoogleAuthFail (error) {
            console.log(error)
        }
    },
}
</script>

<style>
    
</style>