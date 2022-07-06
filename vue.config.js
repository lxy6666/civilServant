module.exports = {
    chainWebpack: config => {
        // 一个规则里的 基础Loader
        // svg是个基础loader
        const svgRule = config.module.rule('svg')

        // 清除已有的所有 loader。
        // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
        svgRule.uses.clear()

        // 添加要替换的 loader
        svgRule
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })

    },
    lintOnSave : false,
    publicPath : './',
    assetsDir  : './',
    transpileDependencies: ['resize-detector'],     //图表 resize
    devServer : {
        port : 8899,
        disableHostCheck: true,
        proxy : {
            '/jiancha': {
                target:'http://124.130.131.91:7000',
                changeOrigin: true
            }
            // '/smart': {
            //     target:'http://jiancha.natapp1.cc',
            //     changeOrigin: true
            // }
            // '/smart': {
            //     target:'http://lk.yuanqiwulian.com',
            //     changeOrigin: true
            // },
        }
    }
}