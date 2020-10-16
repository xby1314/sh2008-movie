<template>
    <div >
       <FilmListTopNav  :class="fixed ? 'fixed' : ''" ></FilmListTopNav>
       <router-view></router-view>
    </div>
</template>
<script>
import FilmListTopNav from '@/components/FilmListTopNav'
export default {
    data() {
        return {
            // 默认不吸顶
            fixed: false,
        };
    },
    // 注册组件
    components: {
        FilmListTopNav
    },
     mounted() {
        window.addEventListener("scroll",(e) => {
            let top = document.documentElement.scrollTop;
            if (top > 100) {
                // 吸顶
                this.fixed = true;
            } else {
                // 还原
                this.fixed = false;
                }
            },
            true
        );
    },
}
</script>
<style lang="scss" scoped>
.fixed {
  position: fixed;
  top: 0;
  background: #fff;
}
</style>