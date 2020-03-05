module.exports = {
    plugins: {
        autoprefixer: {},
        "postcss-px-to-viewport": {
            viewportWidth: 375, //设计稿的宽度，为数值的一半
            viewportHeight: 667,
            unitPrecision: 5, //指定‘px'转换成视窗单位值的小数位数
            viewportUnit: 'vw', //指定需要转换的视窗单位
            selectorBlackList: ['ignore', 'tab-bar', 'tab-bar-item'], //指定不需要转换的类
            minPixelValue: 1, //小于或等于该像素的， 不转换为视窗单位
            mediaQuery: false, //不运行在媒体查询中转换’px' 
            // exclude: [/TabBar/] //忽略文件，必须是正则表达式
        }
    }
}