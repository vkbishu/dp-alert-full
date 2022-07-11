<template>
<div class="wrapper">
    <main class="main" :class="{'collapsed': isCollapsed}">
        <Header @toggle="toggleSidebar"/>
        <div class="">
            <slot></slot>
        </div>
    </main>
</div>
</template>

<script>
import { mapState } from 'vuex'
import Header from "@/components/Header";
export default {
    name: "HomeLayout",
    components: {
        Header
    },
   data() {
        return {
           isCollapsed: false,
        }
    },
    computed: {
        ...mapState(['menu']),
    },
    methods: {
        onToggleCollapse(collapsed) {
            // add collapsed class to .main 
            // add a transition effect on .main class when coll
            this.isCollapsed = collapsed;
        },
        toggleSidebar(){
           this.$refs.sidebar.menuToggle();
        }
    }
}
</script>

<style lang="scss" scoped>
</style>