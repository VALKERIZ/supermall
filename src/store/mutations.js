import {
    ADD_COUNTER,
    ADD_TO_CART
} from './mutation-types'


export default {
    // 新商品加入购物车
    [ADD_TO_CART](state, payload) {
        state.carList.push(payload)
    },
    // 已存在商品数量+1
    [ADD_COUNTER](state, payload) {
        payload.count++
    },

}