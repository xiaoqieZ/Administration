<template>
   <div>
    顶一下
    <div>
        {{name}}
        </div>   
    </div> 
</template>

<script>
export default {
    data(){
        return{
            name:''
        }
    },
    methods:{
        getName(){
            this.name = this.$route.query.data
            console.log(this.name)
        }
    },
    mounted(){
        this.getName()
    }
}
</script>

<style lang="less">

</style>