<template>
    <div>
     <FilmList :list="list" :key="'film' + list.length" :type="type"></FilmList>
    </div>
</template>
<script>
import {comingSoonListData}from '@/api/api'
import FilmList from '@/components/FilmList'
export default {
    data(){
        return{
            pageNum:1,
            list:[],
            type: 2//当前传递的数据为正在热映的电影数据
        }
    },
    components:{
        FilmList
    },
    async mounted() {
        let ret= await comingSoonListData(this.pageNum)
        this.list = ret.data.data.films;
        
    },
}
</script>