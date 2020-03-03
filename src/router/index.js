import Vue from 'vue';
import VueRouter from 'vue-router';

// 安装插件
Vue.use(VueRouter);

// 创建routes
const Home = () =>
    import ('views/home/Home')
const Category = () =>
    import ('views/category/Category')
const Shopcat = () =>
    import ('views/cart/Cart')
const Profile = () =>
    import ('views/profile/Profile')
const Detail = () =>
    import ('views/detail/Detail')

const routes = [{
        path: '',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: Home
    },
    {
        path: '/category',
        name: 'category',
        component: Category
    },
    {
        path: '/shopcat',
        name: 'shopcat',
        component: Shopcat
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile
    },
    {
        path: '/detail/:iid',
        name: 'detail',
        component: Detail
    }
]

// 创建router并导出
const router = new VueRouter({
    mode: 'history',
    routes
})

export default router;