module.exports = {
    configureWebpack: {
        resolve: {
            // extensions:[]  省略文件扩展名
            alias: {
                // '@':src 默认配置
                assets: "@/assets",
                common: "@/common",
                components: "@/components",
                network: "@/network",
                views: "@/views",
            }

        }
    }
}