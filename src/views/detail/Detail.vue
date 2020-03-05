<template>
  <div id="detail">
    <DetailNavBar class="detail-nav" @titleClick="titleClick" ref="nav"></DetailNavBar>
    <Scroll class="content" ref="scroll" @scroll="contentScroll" :probeType="3">
      <DetailSwiper :topImages="topImages"></DetailSwiper>
      <DetailBaseInfo :goods="goods"></DetailBaseInfo>
      <DetailShopInfo :shop="shop"></DetailShopInfo>
      <DetailGoodsInfo :detailInfo="detailInfo" @imageLoad="imageLoad"></DetailGoodsInfo>
      <DetailParamInfo :paramInfo="paramInfo" ref="param"></DetailParamInfo>
      <DetailCommentInfo :commentInfo="commentInfo" ref="comment"></DetailCommentInfo>
      <GoodsList :goods="recommends" ref="recommend"></GoodsList>
    </Scroll>
    <!-- 底部菜单栏 -->
    <DetailBottomBar @addToCart="addToCart"></DetailBottomBar>
    <BackTop @click.native="backClick" v-show="isShowBackTop"></BackTop>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'

import {getDetail, getRecommend, Goods, Shop, GoodsParam} from 'network/detail'
import { debounce } from 'common/utils'
import {itemListenerMixin,backTopMixin} from 'common/mixin'
import { mapActions} from 'vuex'


export default {
  name: 'Detail',
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
  },
  mixins:[itemListenerMixin,backTopMixin],
  data(){
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo:{},
      recommends:[],
      themeTopYs:[],
      getThemeTopY:null,
      currentIndex: 0,
    }
  },
  created(){
    // 1.保存传入的商品iid
    this.iid = this.$route.params.iid

    // 2.根据iid请求数据
    getDetail(this.iid).then(res =>{
      // 1.获取顶部的轮播图数据
      const data = res.result
      this.topImages = data.itemInfo.topImages
      // 2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      // 3.获取店铺信息
      this.shop = new Shop(data.shopInfo)
      // 4.获取商品详情信息
      this.detailInfo = data.detailInfo
      // 5.获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      // 6.获取评论信息
      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0]
      }
    }),

    // 3.请求推荐数据
    getRecommend().then( res => {
      this.recommends = res.data.list
    })

    // 4.给getThemeTopY赋值
    this.getThemeTopY = debounce(() =>{
      this.themeTopYs = []
      this.themeTopYs.push(0)
      // 获取的offsetTop存在问题，有时候会不计算顶部的navBar
      this.themeTopYs.push(this.$refs.param.$el.offsetTop-44)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-44)
    }, 200)
  },
  destroyed(){
    // 取消全局事件的监听
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  },
  methods:{
    // 映射vuex的actions
    ...mapActions(['addCar']),

    // 详细图片加载完成后刷新scrollerHight，防抖处理
    imageLoad(){
      this.newRefresh()
      this.getThemeTopY()
    },
    titleClick(index){
      // scrollToElement直接跳转到对应元素
      // switch(index){
      //   case 0:
      //     this.$refs.scroll.scroll.scrollToElement('.topInfo',500,0,0)
      //     break
      //   case 1:
      //     this.$refs.scroll.scroll.scrollToElement('.paramInfo',500,0,0)
      //     break
      //   case 2:
      //     this.$refs.scroll.scroll.scrollToElement('.commentInfo',500,0,0)
      //     break
      //   case 3:
      //     this.$refs.scroll.scroll.scrollToElement('.recommendInfo',500,0,0)
      //     break
      // }
      // 多移动0.1，防止间隔不清晰
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index]-0.1, 200)
    },
    // 监听内容滚动
    contentScroll(position){
      // 获取Y值
      const positionY = -position.y
      // 判断切换主题时nav进行切换
      for(let [index,pos] of this.themeTopYs.entries()){
        if(positionY > pos){
          this.currentIndex = index
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      // 判断是否显示backTop
      this.listenShowBackTop(position)
    },
    // 监听加入购物车
    addToCart(){
      // 1.获取购物车需要展示的信息
      const product = {}
      product.iid = this.iid
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      
      // 2.将商品添加到购物车
      // this.$store.dispatch('addCar', product).then( res => {
      //   console.log(res);
      // })
      this.addCar(product).then(res => {
          this.$toast.show(res)
        })
    },
  }
}
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 99vh;
  }

  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content{
    /* 减去navbar, bottombar */
    height: calc(100% - 44px - 49px);
  }
</style>