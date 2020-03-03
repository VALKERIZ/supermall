<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImage" alt="" @load="imageLoad">
    <div class="goods-item-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props:{
    goodsItem:{
      type: Object,
      default(){
        return {}
      }
    }
  },
  methods:{
    imageLoad(){
    //  if(this.$route.path.indexOf('/home')){
    //     this.$bus.$emit('homeItemImageLoad')
    //  }else if(this.$route.path.indexOf('/detail')){
    //    this.$bus.$emit('detailItemImageLoad')
    //  }
      this.$bus.$emit('itemImageLoad')
    },
    // 监听商品点击
    itemClick(){
      if(this.goodsItem.iid){
        // 点击Home页面中的商品
        this.$router.push('/detail/' + this.goodsItem.iid)
      }else{
        // 点击商品详细页面中的推荐商品
        this.$router.push('/detail/' + this.goodsItem.item_id)
      }
      
    }
  },
  computed:{
    showImage(){
      return this.goodsItem.image || this.goodsItem.show.img
    }
  }
}
</script>
  
<style scoped>
  .goods-item{
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }
  .goods-item img{
    width: 100%;
    border-radius: 5px;
  }
  .goods-item-info{
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }
  .goods-item-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .goods-item-info .price{
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goods-item-info .collect{
    position: relative;
  }
  .goods-item-info .collect::before{
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url('~assets/img/common/collect.svg') 0 0 /14px 14px;
  }

</style>