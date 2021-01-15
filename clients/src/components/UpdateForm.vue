<template>
    <!-- ===== UPDATE FORM ===== -->
    <div 
        class="card border-danger mb-1" 
        style="max-width: 15rem;">
        
        <form 
            v-on:submit.prevent="updateTask()">
            
            <div 
                class="card-header">
                
                <label 
                    for="title"
                    >Title</label>
                
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
                    rows="8"></textarea>
            
            </div>
            <div 
                class="card-footer" 
                id="pop-update">
                
                <button 
                    class="btn btn-secondary"
                    >Update</button>
                
                <button 
                    class="btn btn-warning" 
                    v-on:click="isUpdate('false')"
                    >Cancel</button>
            
            </div>
        </form>
    </div>
    <!-- ===== END OF UPDATE-FORM ===== -->
</template>

<script>
export default {
    name: "UpdateForm",
    props: [ "form_update" ],
    data () {
        return {
            id: this.form_update.id,
            title: this.form_update.title,
            assign_to: this.form_update.assign_to,
            description: this.form_update.description
        }
    },
    methods: {
        updateTask () {
            this.$emit("updateTask", {
                id: this.id,
                title: this.title,
                assign_to: this.assign_to,
                description: this.description
            })
        },
        isUpdate (input) {
            this.$emit("isUpdate", input)
        }
    }
}
</script>

<style>

</style>