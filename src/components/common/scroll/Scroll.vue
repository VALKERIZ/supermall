<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name:'Scroll',
  props:{
    probeType:{
      type:Number,
      default: 0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return{
      scroll: null,
    }
  },
  mounted(){
    // 1.创建 better-scroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      // 默认点击事件
      click: true,
      // 跟踪滚动
      probeType: this.probeType,
      // 上拉加载
      pullUpLoad:this.pullUpLoad
    })
    // 2.监听滚动事件
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on('scroll',(position) =>{
      this.$emit('scroll',position)
    })
    }
    // 3.监听上拉事件
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () =>{
      this.$emit('pullingUp')
    })
    }
  },
  methods:{
    scrollTo(x, y, time){
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    },
    refresh(){
      this.scroll && this.scroll.refresh()
    },
    getScrollY(){
      return this.scroll ? this.scroll.y : 0
    },
    scrollToElement(){
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  }
}
</script>

<style scoped>

</style>