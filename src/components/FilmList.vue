<template>
        <div class="list scroll" :style="{height: height + 'px'}">
        <Loading v-if="loading"></Loading>
        <div>
            <div class="item" v-for="(item, index) in data"  @click="goDetail(item.filmId)"  :key="index">
            <div class="left">
                <img :src="item.poster" />
            </div>
            <div class="middle">
                <div class="info-col">{{ item.name }}</div>
                <div v-if="type == 1">
                    <span>观众评分 </span>
                    <span class="grade">{{ item.grade }}</span>
                </div>
                <div class="info-col">主演：{{ item.actors | parseActors }}</div>
                <div v-if="type == 1">{{ item.nation }} | {{ item.runtime }}分钟</div>
                <div v-else>上映日期：{{item.premiereAt | parsePremiereAt}} </div>
            </div>
            <div class="right">
                <span v-if="type == 1">购票</span>
        		<i v-else>预约</i>
            </div>
        </div>
        </div>
    </div>

</template>
<script>
import Loading from '@/components/Loading'
import BScroll from "better-scroll";
// 导入请求方法
import { nowPlayingListData,comingSoonListData} from '@/api/api'
import moment from 'moment'
moment.locale('zh-cn')

export default {
    data(){
        return{
            // 默认显示
            loading:true,
            height: 0,
            bs: null,
            pageNum:1,
            flag:true,//控制是否可以继续加载更多
            data:[]
        }
    },
     props: ['list','type'],
      components: {
        Loading
    },
    
    created() {
        // 当进入页面后需要将父传子
        // 判断是否有数据，如果有数据就移除loading加载层
        this.data=this.list
        if(this.data.length > 0){
            this.loading = false
        }
    },
   
     filters: {
        //  处理演员的数据，讲主演的数据从数组形式中
        parseActors: function(value) {
            let actors = "";
            value.forEach((element) => {
                actors += element.name + " ";
            });
            return actors;
        },
          parsePremiereAt: function(value){
        // 时间戳的单位是秒，需要乘以1000转化成毫秒进行处理
        return moment(value*1000).format('ddd MM月DD日')
        },

    },
 
    methods: {
        goDetail: function(filmId) {
            this.$router.push({ name: "detail", params: { filmId } });
        },
        getData:async function(){
           if(this.flag){
                this.pageNum++
            if(this.type==1){
            //   正在热映
             var ret= await nowPlayingListData(this.pageNum)
            }else{
            // 即将上映
             var ret= await comingSoonListData(this.pageNum)
            }
            // 如果当前请求到的数据数量少于,10则说明后面已经没有数据可以被请求，此时需要将标志设置成false
            if(ret.data.data.films.length < 10){
                this.flag = false
            }
            // 将数据处理好新增到列表中
            this.data = this.data.concat(ret.data.data.films)
           }
        }
    },
     mounted() {
        this.height = document.documentElement.clientHeight - 100
        
    },
    updated() {
        this.$nextTick(() => {
            this.bs = new BScroll('.scroll', {
                pullUpLoad: true,
                pullDownRefresh: true,
                click: true
            })
            // 上拉刷新
            this.bs.on('pullingUp', () => {
                // 获取数据
                this.getData();
                this.bs.finishPullUp()
            })
            this.bs.on('pullingDown', () => {
                // 获取数据
                this.getData();
                this.bs.finishPullDown()
            })
        })
    },
    beforeDestroy() {
        this.bs = null
    }
}

</script>
<style lang="scss" scoped>
.scroll {
		overflow: hidden;
}
.list{
    margin-bottom: 50px;
   

    .item {
    margin-top: 15px;
    padding-bottom: 15px;
    display: flex;
    color: #797d82;
    font-size: 13px;
    border-bottom: 1px solid #ededed;

    .left {
        width: 77px;
        height: 100px;
        margin-left: 20px;
        img {
            width: 66px;
            height: 100%;
        }
    }
   .info-col {
	overflow: hidden;
	-o-text-overflow: ellipsis;
	text-overflow: ellipsis;
	white-space: nowrap;
	width: 100%;
    }
 
    .middle {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 55%;
        

        div:nth-of-type(1) {
            color: #191a1b;
            font-size: 16px;
        }

        div:nth-of-type(3) {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
       
    }
     .grade {
	    color: #ffb232;
	    font-size: 14px;
        }

    .right {
        width: 15%;
        display: flex;
        align-items: center;
        margin-right: 20px;

        span {
            border: 1px solid #ff5f16;
           
            background: white;
            color: #ff5f16;
            border-radius: 2px;
            height: 25px;
            line-height: 25px;
            font-size: 13px;
            width: 50px;
            text-align: center;
        }
        i{
            font-style: normal;
            border: 1px solid #ffb232;
            background: white;
            color: #ffb232;
            border-radius: 2px;
            height: 25px;
            line-height: 25px;
            font-size: 13px;
            width: 50px;
            text-align: center;
        }
    }
}
}
</style>