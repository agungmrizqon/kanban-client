<template>
    <!-- ===== KANBAN CONTAINER ===== -->
    <div 
        id="main" 
        class="container-fluid mt-5 d-flex justify-content-center" 
        style="text-align: center;">
        
        <div 
            class="container-fluid row mt-3 d-flex justify-content-center mb-3">
            
            <!-- ===== CONTAINER ===== -->
            <BoxContain
                v-for="category in categories"
                :key="category.id"
                :category="category"
                :categories="categories"
                :tasks="tasks"
                :checkAuth="checkAuth"
                ></BoxContain>
            <!-- ===== END OF CONTAINER ===== -->
        </div>
    </div>
    <!-- ===== END OF KANBAN ===== -->
</template>

<script>
import BoxContain from "./BoxContain"
export default {
    name: "MainPage",
    props: [ "tasks", "categories", "checkAuth" ],
    data () {
        return {
            
        }
    },
    methods: {
        addTask (input) {
            this.$emit("addTask", input)
        },
    },
    components: {
        BoxContain
    }
}
</script>

<style>

</style>