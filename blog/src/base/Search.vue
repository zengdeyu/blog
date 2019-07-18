<template>
    <router-link tag="div" to="/search">
        <Button shape="circle" icon="ios-search" @click="selectItem">输入关键字搜索</Button>
    </router-link>

</template>

<script>
    export default {
        name: "Search",
        methods:{
            selectItem(){
                this.isShow=true
            }
        }
    }
</script>

<style scoped>

</style>