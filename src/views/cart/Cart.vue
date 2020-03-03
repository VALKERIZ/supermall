<template>
  <div id="cart">
    <NavBar class="cart-nav">
      <template #center>
        <div>购物车({{}})</div>
      </template>
    </NavBar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  name: "Cart",
  data(){
    return{

    }
  },
  computed:{
    
  },
  components:{
    NavBar
  }
}
</script>

<style scoped>
  .cart-nav{
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }
</style>