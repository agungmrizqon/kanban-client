<template>
   <!-- ===== FORM REGISTER ===== -->
    <div 
        id="register" 
        class="container d-flex justify-content-center col-5 mt-3">
        
        <div 
            class="container card d-flex justify-content-center mt-5 bg-light">

            <form 
                method="POST" 
                v-on:submit.prevent="userRegister">
                
                <h3 
                    style="text-align: center;" 
                    class="m-3 border-bottom border-info"
                    ><p>Join with kanvan,</p>
                    <p> Register Now</p></h3>
                
                <div 
                    class="mb-3">
                    
                    <label 
                        for="username-register" 
                        class="form-label"
                        >Username</label>
                    
                    <input 
                        type="text" 
                        class="form-control" 
                        id="username-register" 
                        v-model="username">
                
                </div>
                <div 
                    class="mb-3">
                    
                    <label 
                        for="email-register" 
                        class="form-label"
                        >Email address</label>
                    
                    <input 
                        type="email" 
                        class="form-control" 
                        id="email-register" 
                        v-model="email">
                    
                    <div 
                        id="emailHelp" 
                        class="form-text"
                        >We'll never share your email with anyone else.</div>
                
                </div>
                <div 
                    class="mb-3">
                    
                    <label 
                        for="password-register" 
                        class="form-label"
                        >Password</label>
                    
                    <input 
                        type="password" 
                        class="form-control" 
                        id="password-register" 
                        v-model="password">
                
                </div>
                <div 
                    class="mb-3">
                    
                    <button 
                        type="submit" 
                        class="btn btn-primary" 
                        id="register-button"
                        >Submit</button>
                    
                    <a 
                        href="/" 
                        id="go-register" 
                        v-on:click.prevent="changePage('login')"
                        >Login?</a>
                
                </div>
            </form>
        </div>
    </div>
    <!-- ===== END OF FORM REGISTER ====== -->
</template>

<script>

export default {
    name: "RegisterForm",
    data() {
        return {
            username: '',
            email: '',
            password: '',
        }
    },
    methods: {
        changePage(input) {
            
            this.$emit ("changePage", input)
        },
        userRegister () {
            /*
            - create user di database
            - pindah halaman login
            */
            this.$emit("userRegister", { username: this.username, email: this.email, password: this.password })
            this.username = ''
            this.email = '',
            this.password = ''
        },
       
    }

}
</script>

<style>

</style>