<template>
  <div id="home">
    <!-- 底部菜单 -->
    <NavBar class="home-nav">
      <template #center><div>购物街</div></template>
    </NavBar>
    <!-- 吸顶选项栏，实现停留效果 -->
    <TabControl :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl1" v-show="isTabFixed"></TabControl>

    <Scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll" :pullUpLoad="true" @pullingUp="loadMore">   
      <!-- 轮播图 -->
      <HomeSwiper :banners="banners" @swiperImageLoad="swiperImageLoad"></HomeSwiper>
      <!-- 推荐信息 -->
      <HomeRecommendView :recommends="recommends"></HomeRecommendView>
      <!-- 本周流行 -->
      <HomeFeatureView></HomeFeatureView>
      <!-- 选项 -->
      <TabControl :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2" ></TabControl>
      <!-- 商品展示 -->
      <GoodsList :goods="showGoods"></GoodsList>
    </Scroll>

    <BackTop @click.native="backClick" v-show="isShowBackTop"></BackTop>
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommendView from './childComps/HomeRecommendView'
import HomeFeatureView from './childComps/HomeFeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import {getHomeMultidata,getHomeGoods,} from 'network/home'
import {debounce} from 'common/utils'

export default {
  name: "Home",
  components:{
    NavBar,
    TabControl,
    HomeSwiper,
    HomeRecommendView,
    HomeFeatureView,
    GoodsList,
    Scroll,
    BackTop,
  },
  data(){
    return{
      banners:[],
      recommends:[],
      goods:{
        'pop':{page: 0, list: []},
        'new':{page: 0, list: []},
        'sell':{page: 0, list: []},
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    }
  },
  created(){
    // 1.请求多个数据
    this.getHomeMultidata()

    // 2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted(){
    // 1.监听图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh, 200)
    this.$bus.$on('itemImageLoad', () =>{
      // 进行防抖操作
      refresh()
    })
  },
  // 清除图片加载事件
  destroyed(){
    this.$bus.$off('itemImageLoad')
  },
  activated(){
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated(){
    this.saveY = this.$refs.scroll.getScrollY()
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  methods:{
    // 网络请求相关方法
    getHomeMultidata(){
      getHomeMultidata().then(res =>{
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
    })
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res =>{
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        // 完成本次上拉加载
        this.$refs.scroll.finishPullUp()
      })
    },

    // 事件监听相关方法
    tabClick(index){
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break;
        case 1:
          this.currentType = 'new'
          break;
        case 2:
          this.currentType = 'sell'
          break;
      }
      // 保存tab-control的选中一致
      this.$refs.tabControl1.currentType = index;
      this.$refs.tabControl2.currentType = index;
    },
    backClick(){
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    contentScroll(position){
      // 1.判断backTop是否显示
      this.isShowBackTop = (-(position.y) > 1000)

      // 2. 判断tabControl是否吸顶
      this.isTabFixed = (-(position.y) > this.tabOffsetTop)
    },
    loadMore(){
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad(){ 
      // 获取tabControl的offsetTop
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop 
    },
  }
}
</script>

<style scoped>
  #home{
    /* vh:视口高度 */
    height: 100vh;
    position: relative;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
  }
  
  .tab-control{
      /* 
      position: sticky;
      当滚动条的位置超过top值，自动将position变为fixed
      兼容性不是很好，但一般移动端都支持该属性
      原生的滚动才支持
     */
    position: relative;
    z-index: 9;
  }

  /* 滚动区域 */
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

</style>