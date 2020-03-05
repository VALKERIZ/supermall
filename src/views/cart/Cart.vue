<template>
  <div id="cart">
    <!-- 1.导航 -->
    <NavBar class="cart-nav">
      <template #center>
        <div>购物车({{length}})</div>
      </template>
    </NavBar>

    <!-- 2.商品列表 -->
    <CartList></CartList>

    <!-- 3.底部汇总 -->
    <CartBottomBar></CartBottomBar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

// 将getters中的方法映射到computed中
import { mapGetters } from 'vuex'

export default {
  name: "Cart",
  components:{
    NavBar,
    CartList,
    CartBottomBar,
  },
  data(){
    return{

    }
  },
  computed:{
    // 2种写法
    // ...mapGetters(['cartLength'])
    ...mapGetters({
      length: 'cartLength'
    })
    
  },
}
</script>

<style scoped>
  #catr{
    height: 100vh;
  }
  .cart-nav{
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }
</style>