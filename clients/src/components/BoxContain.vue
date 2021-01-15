<template>
    <!-- ===== CONTAINER ===== -->
    <div 
        class="col ">
        
        <div 
            :class="category.color" 
            style="max-width: 18rem;">
            
            <div 
                class="card-header tag"
                > {{ category.name }} </div>
                
                <div 
                    class="card-body text-primary overflow-auto">

                    <!-- ===== INPUT ===== -->
                    <div 
                        v-if="addData === 'false' && updateData === 'false'">
                        
                        <Tasks
                            v-for="task in fetchDataInput" 
                            :key="task.id"
                            :task="task"
                            :movingId="movingId"
                            :deleteId="deleteId"
                            :categories="categories"
                            @isMove="isMove"
                            @isDelete="isDelete"
                            @isUpdate="isUpdate"
                            @removeData="removeData"
                            @changeCategory="changeCategory"
                            ></Tasks>
                    
                    </div>
                    <!-- ===== END OF INPUT ===== -->
                    <!-- ===== ADD FORM ===== -->
                    <div 
                        v-if="addData === 'true'">
                        
                        <AddForm
                            @isAdd="isAdd"
                            @addTask="addTask"
                            ></AddForm>
                    
                    </div>
                    <!-- ===== END OF ADD-FORM ===== -->

                    <!-- ===== UPDATE FORM ===== -->
                    <div 
                        v-if="updateData === 'true'">
                        
                        <UpdateForm
                            :form_update="form_update"
                            @updateTask="updateTask"
                            @isUpdate="isUpdate"
                            ></UpdateForm>
                    
                    </div>
                    <!-- ===== END OF UPDATE-FORM ===== -->
                </div>

                <div 
                    class="card-footer" 
                    id="add-button" 
                    style="min-height: 56px;">
                    
                    <button 
                        type="button" 
                        class="btn btnAdd" 
                        v-show="addData === 'false' " 
                        v-on:click="isAdd('true')"
                        ><i class="fas fa-plus"
                        ></i>  Add New Task</button>
                
                </div>
        
        </div>
    </div>
    <!-- ===== END OF CONTAINER ===== -->
</template>

<script>
import axios from "../axiosInstance"
import Tasks from "./Tasks"
import AddForm from "./AddForm"
import UpdateForm from "./UpdateForm"

export default {
    name: "BoxContain",
    props: [ "category", "categories", "tasks", "checkAuth" ],
    data () {
        return {
           addData: "false",
           updateData: "false",
           deleteId: "",
           movingId: "",
           form_update: {
               id: "",
               title: "",
               assign_to: "",
               description: ""
           }
        }
    },
    methods: {
        isAdd(input) {
            this.addData = input
        },
        isDelete (id) {
            this.deleteId = id
            // console.log(this.deleteId, id)
        },
        isMove (id) {
            this.movingId = id
        },
        isUpdate(input, id) {
            if(id) {
                axios({
                    method: "GET",
                    url: `/tasks/${id}`,
                    headers: {
                        access_token: localStorage.access_token
                    }
                })
                .then (response => {
                    console.log(response)
                    this.form_update = {
                        id: response.data.id,
                        title: response.data.title,
                        assign_to: response.data.assign_to,
                        description: response.data.description
                    }
                    this.updateData = input
                })
                .catch (err => {
                    const errorData = err.response.data.message

                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: errorData,
                    })
                })
            } else {
                this.updateData = input
            }
        },
        updateTask (input) {
            // const category = "Back-Log"
            const { id, title, assign_to, description } = input
            // console.log(id, title, assign_to, description)
            axios({
                method: "PUT",
                url: `/tasks/${id}`,
                data: {
                    title,
                    assign_to,
                    description,
                   
                },
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then (response => {
                this.checkAuth()
                this.isUpdate("false")
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
        addTask (input) {
            console.log(input)
            const { title, assign_to, description } = input
            const category = this.category.name
            axios({
                method: "POST",
                url: `/tasks`,
                data: { title, assign_to, category, description },
                headers: {
                     access_token: localStorage.access_token
                }
            })
            .then (response => {
                console.log(response, "<<< setelah axios")
                this.isAdd("false")
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
        removeData(id) {
            console.log(id)
            axios({
                method: "DELETE",
                url: `/tasks/${id}`,
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then (response => {
                console.log(response)
                this.isDelete("")
                this.checkAuth()
            })
            .catch(err => {
                const errorData = err.response.data.message

                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: errorData,
                })
            })
        },
        changeCategory(input) {
            const { id, category } = input

            axios({
                method: "PATCH",
                url: `/tasks/${id}`,
                data: { category },
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then (response => {
                this.isMove('')
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
        }

    },
    computed: {
        fetchDataInput () {
            return this.tasks.filter(task => task.category === this.category.name)
        }
    },
    components: {
        Tasks,
        AddForm,
        UpdateForm
    },
    
}
</script>

<style>

</style>