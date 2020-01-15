import Vue from 'vue';
import VueRouter from 'vue-router';

// 安装插件
Vue.use(VueRouter);

// 创建router并导出
const Home = () =>
    import ('../views/home/Home.vue')
const Category = () =>
    import ('../views/category/Category.vue')
const Shopcat = () =>
    import ('../views/shopcat/Shopcat.vue')
const Profile = () =>
    import ('../views/profile/Profile.vue')

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
    }, ,
    {
        path: '/shopcat',
        name: 'shopcat',
        component: Shopcat
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile
    }
]
export const router = new VueRouter({
    mode: 'history',
    routes
});