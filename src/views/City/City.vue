<template>
     <div class="box">
        <div class="header">
            <div class="left">
                <!-- <van-icon name="cross" @click="goBack()"/> -->
                <van-icon class="icon" name="cross" @click="chooseCity()" />
            </div>
            <div class="title">当前城市 -{{cityName}}</div>
        </div>
        <div class="search-city-input">
            <div class="input-wrap">
                <van-icon name="search" class="search-icon" />
                <input type="text" placeholder="输入城市名或拼音" class="search-input"/>
            </div>
        </div>

            <div class="list-parents">
                <van-index-bar :index-list="indexList" style="margin-top:93px" highlight-color="#000" class="list">
            <div class="recommend-city" >
                <div class="gprs-city">
                    <div class="city-index-title">GPS定位你所在城市</div>
                    <ul class="city-index-detail cleanfix">
                        <li class="city-item-detail city-item-detail-gprs">
                            <div v-if="cityName != null" class="city-item-text">{{cityName}}</div>
                            <div v-else class="city-item-text">定位失败</div>
                        </li>
                    </ul>
                </div>
                <div class="hot-city">
                    <div class="city-index-title">热门城市</div>
                    <ul class="city-index-detail cleanfix">
                        <li class="city-item-detail">
                            <div class="city-item-text">北京</div>
                        </li>
                        <li class="city-item-detail">
                            <div class="city-item-text">上海</div>
                        </li>
                        <li class="city-item-detail">
                            <div class="city-item-text">广州</div>
                        </li>
                        <li class="city-item-detail">
                            <div class="city-item-text">深圳</div>
                        </li>
                    </ul>
                </div>
            </div>
            <template v-for="(item, index) in dataList">
                <van-index-anchor style="background:#F4F4F4" :index="item.index" :key="index"/>
                <van-cell v-for="(v, k) in item.data" :title="v.name" :key="k"  @click="chooseCity(v.name,v.cityId)" />
            </template>
        </van-index-bar>
            </div>
    </div>
</template>
<script>
import {cityListData} from '@/api/api'
import Vue from 'vue'
import BScroll from "better-scroll";
import{IndexBar,IndexAnchor,Cell,Icon}from "vant"
import "vant/lib/index.css"
Vue.use(IndexBar)
Vue.use(IndexAnchor)
Vue.use(Cell)
Vue.use(Icon)
export default {
    data() {
        return {
            dataList: [],
            indexList: [],
            height:0,
            bs: null,
            cityId:'',
            cityName:'',
            clickName:''
             
        };
    },
    // 进入的时候去掉底部导航
    created() {
        this.eventBus.$emit('footernav',false)
    },
    mounted() {
           

    },
    // updated() {
    //     this.$nextTick(() => {
    //         this.bs = new BScroll('.scroll', {
    //             pullUpLoad: true,
    //             pullDownRefresh: true,
    //             click: true
    //         })
    //         // 上拉刷新
    //         this.bs.on('pullingUp', () => {
    //             // 获取数据
    //             this.getData();
    //             this.bs.finishPullUp()
    //         })
    //         this.bs.on('pullingDown', () => {
    //             // 获取数据
    //             this.getData();
    //             this.bs.finishPullDown()
    //         })
    //     })
    // },
    beforeDestroy() {
        this.eventBus.$emit("footernav", true);
    },
    async mounted() {
       var ret = await cityListData();  //dataList, indexList
        this.dataList=ret[0]
        this.indexList=ret[1]
         // 获取城市名字
            let cityName = localStorage.getItem("cityName");
            this.cityName= cityName
            // console.log(this.dataList);
        		
            
       
    },
    methods: {
         goBack: function() {
        this.$router.go(-1);
        },
        // 获取选择的城市名称
        chooseCity: function(cityName,Id){
                // 获取 localStorage的值
                if(Id!=undefined){
                localStorage.setItem("clickId",Id)
                localStorage.setItem("clickName" , cityName);   
                }
           
            this.$store.commit('setCity',cityName)
            this.$router.go(-1)
        }
     }, 
    
}
</script>
<style lang="scss" scoped>
.list-parents {
    overflow-x: hidden;
}
.box {
    .header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 44px;
        overflow: hidden;
        margin: 0;
        padding: 0;
        display: flex;
        z-index: 999;
        background-color: #fff;

        .left {
            width: 14%;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            justify-content: flex-start;
            align-items: center;

            .city-list .header i {
                display: block;
                font-size: 23px;
            }

            .icon {
                font-size: 22px;
                margin-left: 20px;
                color: #929293;
            }
        }
        .title {
            width: 72%;
            text-align: center;
            font-size: 17px;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #191a1b;
        }
        ::after {
            content: ' ';
            position: absolute;
            left: 0;
            bottom: 0;
            right: 0;
            height: 1px;
            border-bottom: 1px solid #ededed;
            color: #ededed;
            transform-origin: 0 100%;
            transform: scaleY(0.5);
        }
    }
    .search-city-input {
        z-index: 2000;
        width: 100vw;
        padding: 9.5px 15px;
        background-color: #f4f4f4;
        position: fixed;
        top: 44px;
        height: 30px;

        ::placeholder {
            font-size: 11px;
            color: #bdc0c5;
        }

        .input-wrap {
            background-color: #fff;
            position: relative;
            display: inline-block;
            border-radius: 3px;
            width: 93%;
            height: 30px;

            .search-icon {
                position: absolute;
                left: 7px;
                top: 0;
                line-height: 30px;
                font-size: 16px;
                color: #797d82;
            }
            .search-input {
                position: absolute;
                left: 33.5px;
                top: 0;
                height: 30px;
                width: calc(100% - 65px);
                border: 0;
            }
        }
    }
    .list {
        .recommend-city {
            background-color: #fff;
            padding-left: 15px;
            padding-top: 15px;

            .city-index-title {
                font-size: 13px;
                color: #797d82;
                margin-bottom: 10px;
            }
            .city-index-detail {
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                justify-content: flex-start;
                align-content: center;
                flex-wrap: wrap;

                .city-item-detail {
                    width: calc((100vw - 33px) / 3);
                    text-align: center;
                    padding-bottom: 15px;
                    box-sizing: border-box;
                    float: left;

                    .city-item-text {
                        height: 30px;
                        background-color: #f4f4f4;
                        line-height: 30px;
                        border-radius: 3px;
                        box-sizing: border-box;
                        margin: 0 7.5px;
                        font-size: 14px;
                        color: #191a1b;
                    }
                }
            }
        }
    }
}
</style>

