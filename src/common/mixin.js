import { debounce } from 'common/utils'
import BackTop from 'components/content/backTop/BackTop'
import { TOP_DISTANCE } from 'common/const'

// 混入
export const itemListenerMixin = {
    data() {
        return {
            itemImgListener: null,
            newRefresh: null
        }
    },
    mounted() {
        // 防抖函数
        this.newRefresh = debounce(this.$refs.scroll.refresh, 200)
            // 1.监听图片加载完成
        this.itemImgListener = () => {
            // 进行防抖操作
            this.newRefresh()
        }
        this.$bus.$on('itemImageLoad', this.itemImgListener)
    }
}


export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isShowBackTop: false,
        }
    },
    methods: {
        backClick() {
            this.$refs.scroll.scrollTo(0, 0, 500)
        },
        listenShowBackTop(position) {
            this.isShowBackTop = (-(position.y) > TOP_DISTANCE)
        }
    }
}