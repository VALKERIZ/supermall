<template>
  <div id="home">
    <NavBar class="home-nav">
      <template #center><div>购物街</div></template>
    </NavBar>
    <!-- 轮播图 -->
    <HomeSwiper :banners="banners"></HomeSwiper>
    <!-- 推荐信息 -->
    <HomeRecommendView :recommends="recommends"></HomeRecommendView>
    <!-- 本周流行 -->
    <HomeFeatureView></HomeFeatureView>
    <!-- 选项 -->
    <TabControl class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick"></TabControl>
    <!-- 商品展示 -->
    <GoodsList :goods="showGoods"></GoodsList>

    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommendView from './childComps/HomeRecommendView'
import HomeFeatureView from './childComps/HomeFeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'

import {
  getHomeMultidata,
  getHomeGoods,
} from 'network/home'

export default {
  name: "Home",
  components:{
    NavBar,
    TabControl,
    HomeSwiper,
    HomeRecommendView,
    HomeFeatureView,
    GoodsList,
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
      currentType: 'pop'
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
        console.log(res);
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
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
    }
  }
}
</script>

<style>
  #home{
    padding-top: 44px;
    padding-bottom: 49px;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
  }
  .tab-control{
    /* 
      当滚动条的位置超过top值，自动将position变为fixed
      兼容性不是很好，但一般移动端都支持该属性
     */
    position: sticky;
    top: 44px;
    z-index: 9;
  }
</style>