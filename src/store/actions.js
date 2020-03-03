import {
    ADD_COUNTER,
    ADD_TO_CART
} from './mutation-types'

export default {
    // 第一个参数为context
    addCar({ state, commit }, payload) {
        // payload新添加的商品
        let exist = state.carList.find(item => item.iid === payload.iid)
        if (exist) {
            commit(ADD_COUNTER, exist)
        } else {
            payload.count = 1
            commit(ADD_TO_CART, payload)
        }

    }
}