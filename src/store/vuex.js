import Vue from 'vue'
import Vuex from 'vuex'
// 在vue中使用vuex
Vue.use(Vuex)
export default new Vuex.Store({
    // state中存放的就是全局共享的数据
    state: {
        count: 0,
        city: '',
        // 如果有更多的数据需要存储记这些就完了
        _token: "",
        cityId: '',
        clickName: ''
    },
    mutations: {
        add: function (state, step) {
            state.count += step
        },
        setCity: function (state, cityName) {
            state.city = cityName
        },
        updateToken: function (state, _token) {
            state._token = _token
            localStorage.setItem("_token", _token)
        }



    },
    actions: {
        addAsync: function (context, step) {
            setTimeout(() => {
                context.commit('add', step)
            }, 3000)
        }
    },
    getters: {
        getCount: function (state) {
            return '当前总数是' + state.count
        }
    }

})