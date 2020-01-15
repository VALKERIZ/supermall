<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot  name="item-text"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    data () {
      return{
      }
    },
    props: {
      path: String,
      activeColor: {
        type: String,
        default: 'red',
      }
    },
    computed: {
      isActive(){
        return this.$route.path.indexOf(this.path) !==-1
      },
      activeStyle(){
        return this.isActive? {color: this.activeColor} : {}
      }
    },
    methods: {
      itemClick(){
        if (this.$route.path !== this.path) {
          this.$router.replace(this.path)
        }
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item img{
    height: 24px;
    widows: 24px;
    margin-top: 3px;
  }
</style>