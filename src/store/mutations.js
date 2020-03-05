import {
    ADD_COUNTER,
    ADD_TO_CART,
    DO_SELECT,
    UN_SELECT,
} from './mutation-types'


export default {
    // 新商品加入购物车
    [ADD_TO_CART](state, payload) {
        payload.checked = true
        state.cartList.push(payload)
    },
    // 已存在商品数量+1
    [ADD_COUNTER](state, payload) {
        payload.count++
    },

    // 全部选中
    [DO_SELECT](state) {
        state.cartList.forEach(element => element.checked = true)
    },
    // 全部不选中
    [UN_SELECT](state) {
        state.cartList.forEach(element => element.checked = false)
    }

}