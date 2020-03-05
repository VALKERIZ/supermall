import {
    ADD_COUNTER,
    ADD_TO_CART,
    DO_SELECT,
    UN_SELECT,
} from './mutation-types'

export default {
    // 第一个参数为context
    addCar({ state, commit }, payload) {
        return new Promise((resolve, reject) => {
            // payload新添加的商品
            let exist = state.cartList.find(item => item.iid === payload.iid)
            if (exist) {
                commit(ADD_COUNTER, exist)
                resolve('当前商品数量+1')
            } else {
                payload.count = 1
                commit(ADD_TO_CART, payload)
                resolve('添加了新的商品')
            }
        })
    },
    // 全选框：选中或不选中
    aLLSelect({ state, commit }, payload) {
        if (state.cartList.length === 0) {
            return false
        }
        if (payload) { // 原来全部选中，取消全选
            commit(UN_SELECT)
        } else { // 原来没全部选中，进行全选
            commit(DO_SELECT)
        }
    },
}