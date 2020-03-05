<template>
  <div class="bottom-menu">
    <CheckButton class="select-all" @click.native="checkBtnClick" :isChecked="isSelectAll"></CheckButton>
    <span>全选</span>
    <span class="total-price">合计: ¥ {{totalPrice}}</span>
    <button class="buy-product" @click="payBtnClick">结算({{cartLength}})</button>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton"

import { mapGetters } from 'vuex'

export default {
  name:'CartBottomBar',
  components:{
    CheckButton,
  },
  computed: {
    ...mapGetters(['cartList','cartLength','isSelectAll']),

    totalPrice(){
      return this.cartList.filter( item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.count * item.price
      }, 0).toFixed(2)
    },
    // 判断购物车是否全选
    isSelectAll() {
        if (this.cartLength === 0) {
            return false
        }
        return !this.cartList.find(item => !item.checked)
    }
  },
  methods:{
    checkBtnClick(){
      this.$store.dispatch('aLLSelect',this.isSelectAll)
    },
    payBtnClick(){
      if(this.cartLength === 0){
        this.$toast.show('请先添加商品到购物车')
      }else if(this.totalPrice == 0){
        this.$toast.show('请选中至少一件商品')
      }

    }
  }
}
</script>

<style scoped>
.bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 49px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }

  .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }

  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .bottom-menu .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>