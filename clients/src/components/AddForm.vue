<template>
   <!-- ===== ADD FORM ===== -->
    <div>
        <div 
            class="card border-danger mb-1" 
            style="max-width: 15rem;">
            
            <form 
                v-on:submit.prevent="addTask">
                
                <div 
                    class="card-header">
                    
                    <label 
                        for="title">Title</label>
                    
                    <input 
                        type="text" 
                        class="form-control" 
                        v-model="title" 
                        id="title">
                
                </div>
                
                <div 
                    class="card-body">
                    
                    <label 
                        for="assign_to"
                        >Assign To</label>
                    
                    <input 
                        type="text" 
                        id="assign_to" 
                        v-model="assign_to">
                    
                    <label 
                        for="description"
                        >Description</label>
                    
                    <textarea 
                        class="form-control" 
                        id="description" 
                        v-model="description" 
                        cols="20" 
                        rows="8"
                        ></textarea>
                
                </div>
                
                <div 
                    class="card-footer" 
                    id="pop-add">
                    
                    <button 
                        class="btn btn-secondary"
                        >Add</button>
                    
                    <button 
                        class="btn btn-warning" 
                        v-on:click="isAdd('false')"
                        >Cancel</button>
                
                </div>
            
            </form>
        </div>
    </div>
    <!-- ===== END OF ADD-FORM ===== -->
</template>

<script>
export default {
    name: "AddForm",
    data () {
        return {
            title: "",
            assign_to: "",
            description: ""
        }
    },
    methods: {
        addTask () {
            this.$emit ("addTask", { 
                title: this.title, 
                assign_to: this.assign_to, 
                description:this.description
            })
        },
        isAdd(input) {
            this.$emit("isAdd", input)
        }
    }
}
</script>

<style>

</style>