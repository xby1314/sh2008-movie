<template>
    <div class="nav">
        <ul>
            <router-link to="/film" active-class="active" tag="li">
                <i class="iconfont icondianying"></i>
                <p>影片</p>
            </router-link>
            <router-link to="/cinema" active-class="active" tag="li">
                <i class="iconfont iconyingyuan"></i>
                <p>影院</p>
            </router-link>
            <!-- <router-link to="/" active-class="active" tag="li">
                <i class="iconfont iconzixun"></i>
                <p>资讯</p>
            </router-link> -->
            <router-link to="/center" active-class="active" tag="li">
                <i class="iconfont icongeren"></i>
                <p>我的</p>
            </router-link>
        </ul>
    </div>
</template>

<script>
// import导入样式
import"@/assets/iconfont/iconfont.css";

export default {
    data() {
        return {};
    },
    mounted() {},
};
</script>

<style lang="scss" scoped>
.nav {
     position: fixed;
    bottom: 0;
    left: 0;
    border-top: 1px solid #ccc;
    height: 50px;
    text-align: center;
    background: #fff;
    color: #7a7e83;
    width: 100%;
    z-index: 10;

    ul {
        display: flex;
        align-items: center;
        li {
            margin-top: 2px;
            
            flex: 1;
            height: 43px;
            &.active {
                color: #fe5100;
            }
            p {
                margin-top:2px;
            }
            i {
                font-size: 20px;
            }
        }
    }
}
</style>