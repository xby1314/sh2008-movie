<template>
    <div>
        <van-index-bar :index-list="indexList" highlight-color="#ff0000">
            <template v-for="item in dataList">
                <van-index-anchor :index="item.index" :key="item.index" style="background:#eee"></van-index-anchor>
               <van-cell  v-for="(sub,key) in item.data" @click="chooseCity(sub.name)" :title="sub.name" :key="key" />
            </template>
        </van-index-bar>
    </div>
</template>
<script>
import {cityListData} from '@/api/api'
import Vue from 'vue'
import{IndexBar,IndexAnchor,Cell}from "vant"
import "vant/lib/index.css"
Vue.use(IndexBar)
Vue.use(IndexAnchor)
Vue.use(Cell)
export default {
    data() {
        return {
            dataList: [],
            indexList: [],
        };
    },
    // 进入的时候去掉底部导航
    created() {
        this.eventBus.$emit('footernav',false)
    },
    beforeDestroy() {
        this.eventBus.$emit("footernav", true);
    },
    async mounted() {
       var ret = await cityListData();  //dataList, indexList
        this.dataList=ret[0]
        this.indexList=ret[1]
        console.log(ret);
    },
    methods: {
        // 获取选择的城市名称
        chooseCity: function(cityName){
            // 将数据写到vuex中
            this.$store.commit('setCity',cityName)
            this.$router.go(-1)
        }
     }, 
    
}
</script>