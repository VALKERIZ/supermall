const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    lintOnSave: false,
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

// module.exports = {
//     chainWebpack: (config) => {
//         config.resolve.alias
//             .set('@', resolve('src'))
//             .set('assets', resolve('src/assets'))
//             .set('components', resolve('src/components'))
//             .set('common', resolve('src/common'))
//             .set('network', resolve('src/network'))
//             .set('views', resolve('src/views'))
//     }
// }