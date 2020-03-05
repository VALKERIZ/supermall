import Toast from './Toast.vue'

const plugin = {}

plugin.install = function(Vue) {
    // 1.创建组件构造器
    const toastConstructor = Vue.extend(Toast)

    // 2.根据new的方式创建出一个组件对象
    const toast = new toastConstructor()

    // 3.将组件对象手动挂载
    toast.$mount(document.createElement('div'))

    // 4.toast$el对应上面创建的元素
    document.body.appendChild(toast.$el)

    Vue.prototype.$toast = toast;
}

export default plugin