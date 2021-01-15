<template>
   <!-- ===== INPUT ===== -->
    <div>
        <div 
            class="card border-primary mb-3" 
            style="max-width: 15rem;">
            
            <div 
                class="card-header bg-transparent border-primary"
                >
                <h5>{{ task.title }}</h5>
                <small 
                    class="text-muted border-bottom border-primary"
                    >User Id: {{ task.UserId }} </small>
                </div>
                
                <div 
                    class="card-body">
                    
                    <small 
                        class="text-muted border-bottom border-primary"
                        >Assign To: {{ task.assign_to }} </small>
                    
                    <p 
                        class="card-text"
                        >{{ task.description }}</p>
                    
                </div>
                <div 
                    class="card-footer bg-transparent border-primary">
                    
                    <div 
                        class="btn-group" 
                        role="group" 
                        v-if="deleteId !== task.id && movingId !== task.id">
                        
                        <button 
                            type="button" 
                            class="btn btn-secondary" 
                            v-on:click.prevent="isUpdate('true', task.id)" 
                            data-toggle="tooltip" 
                            data-placement="bottom" 
                            title="Edit">
                                <i 
                                    class="fas fa-pen"
                                    ></i></button>
                        
                        <button 
                            type="button" 
                            class="btn btn-danger" 
                            data-toggle="tooltip" 
                            v-on:click="isDelete(task.id)" 
                            data-placement="bottom" 
                            title="Delete">
                                <i 
                                    class="fas fa-eraser"
                                    ></i></button>
                        
                        <button 
                            class="btn btn-warning" 
                            type="button" 
                            data-toggle="tooltip"
                            @click="isMove(task.id)" 
                            data-placement="bottom" 
                            title="Move">
                                <i 
                                    class="fas fa-arrows-alt"
                                    ></i></button>
                    
                    </div>  
                    <div 
                        class="row" 
                        id="task.id" 
                        v-else-if="deleteId === task.id">
                        
                        <label
                            >Are You Sure?</label>
                        
                        <button 
                            type="button" 
                            class="btn btn-danger" 
                            v-on:click="removeData(task.id)"
                            >Yes</button>
                        
                        <button 
                            type="button" 
                            class="btn btn-warning" 
                            v-on:click="isDelete('')"
                            >No</button>
                    
                    </div>
                    <div 
                        class="row"
                        v-else-if="movingId === task.id">

                        <div 
                            v-for="item in fetchExceptOne" 
                            :key="item.id">
                            
                            <div 
                                class="row justify-content-center" >
                                
                                <button 
                                    type="button" 
                                    :class="item.color"
                                    @click.prevent="changeCategory(task.id, item.name)"
                                    >{{ item.name }}</button>
                            
                            </div>
                        
                        </div>
                        
                        <button 
                            type="button" 
                            class="btn btn-warning" 
                            v-on:click="isMove('')"
                            >Cancel</button>
                    </div>
                </div>
        </div>
    </div>
    <!-- ===== END OF INPUT ===== -->
</template>

<script>
export default {
    name: "Tasks",
    props: [ "task", "deleteId", "movingId", "categories" ],
    data() {
        return {
        
        }
    },
    methods: {
        isDelete(input) {
            this.$emit("isDelete", input)
        },
        isUpdate(input, id) {
            this.$emit("isUpdate", input, id)
        },
        isMove(input) {
            
            this.$emit("isMove", input)
        },
        removeData(input) {
            this.$emit("removeData", input)
        },
        changeCategory (id, newCategory) {
            this.$emit("changeCategory", { id, category: newCategory })
        }
    },
    computed: {
        fetchExceptOne () {
            console.log(this.categories)
            console.log(this.task)
            return this.categories.filter (category => category.name !== this.task.category)
        }
    }
}
</script>

<style>

</style>