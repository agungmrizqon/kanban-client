<template>
 
    <div 
        id="app">

        <!-- ===== NAVBAR ===== -->
        <div 
            class="container">
            
            <nav 
                class="navbar navbar-expand-lg fixed-top navbar-light">
                
                <div 
                    class="container-fluid">
                
                <a 
                    class="navbar-brand" 
                    href="#" 
                    style="font-style: italic; font-weight: bold;"
                    >Kanvan</a>
                
                </div>
                <div 
                    v-if="page === 'main'">
                    
                    <button 
                        id="logout-button"  
                        class="btn btn-outline-dark mr-5" 
                        v-on:click="logout">
                        Logout</button>
                
                </div>
            </nav>
        </div>
        <!-- ===== END OF NAVBAR ===== -->
    
   
        <!-- ===== FORM LOGIN ===== -->
        <LoginForm
            
            @changePage="changePage"
            @userLogin="userLogin"
            v-if="page === 'login'"
            :errorMessages="errorMessages"
            :checkAuth="checkAuth"
            ></LoginForm>
        <!-- ===== END OF FORM LOGIN ===== -->


        <!-- ===== FORM REGISTER ===== -->
        <RegisterForm
            @userRegister="userRegister"
            @changePage="changePage"
            v-else-if="page === 'register'"
            ></RegisterForm>
        <!-- ===== END OF FORM REGISTER ====== -->

        <!-- ===== KANBAN CONTAINER ===== -->
        <MainPage
            v-else-if="page === 'main'"
            :categories="categories"
            :tasks="tasks"
            :checkAuth="checkAuth"
            ></MainPage>
        <!-- ===== END OF KANBAN CONTAINER -->
    </div>

</template>

<script>
import axios from "./axiosInstance"
import LoginForm from "./components/LoginForm"
import RegisterForm from "./components/RegisterForm"
import MainPage from "./components/MainPage"

export default {
    name: "App",
    data() {
        return {
            page: "login",
            errorMessages: [],
            tasks: [],
            categories: [
                {
                    id: 1,
                    color: "card border-primary box mb-1 text-center",
                    name: "Back-Log"
                },
                {
                    id: 2,
                    color: "card border-warning box mb-1 text-center",
                    name: "Todo"
                },
                {
                    id: 3,
                    color: "card border-info box mb-1 text-center",
                    name: "Doing"
                },
                {
                    id: 4,
                    color: "card border-success box mb-1 text-center",
                    name: "Done"
                }
            ],
        }
        
    },
    methods: {
        userLogin (input) {
            const { email, password } = input
            axios({
                method: "POST",
                url:`/users/login`,
                data: { email, password }
            })
            .then (result => {
                localStorage.setItem("access_token", result.data.access_token)
                this.checkAuth()
            })
            .catch (err => {
                const errorData = err.response.data.message

                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: errorData,
                })
            })
        },
        userRegister (input) {
            const { username, email, password } = input
            axios({
                method: "POST",
                url: `/users/register`,
                data: { username, email, password }
            })
            .then (result => {
                console.log(result)
                this.changePage("login")
            })
            .catch (err => {
                const errorData = err.response.data.message

                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: errorData,
                })
            })
        },
        changePage (page) { 
            this.page = page
        },
        checkAuth() {
            console.log(localStorage.getItem("access_token"))
            if (localStorage.getItem("access_token")) {
                this.changePage("main")
                this.getAllData()
            } else {
                this.changePage("login")
            }
        },
        logout () {
            localStorage.clear()
            // const auth2 = gapi.auth2.getAuthInstance();
            // auth2.signOut().then(function () {
            //     console.log('User signed out.');
            // })
            this.checkAuth()
        },
        getAllData () {
            axios({
                method: "GET",
                url: `/tasks`,
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then (response => {
                this.tasks = response.data
            })
            .catch (err => {
                const errorData = err.response.data.message

                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: errorData,
                })
            })
        },
        
          
    },
    components: {
        LoginForm,
        RegisterForm,
        MainPage
    },
    created () {
        this.checkAuth()
    }
}
</script>

<style>

</style>