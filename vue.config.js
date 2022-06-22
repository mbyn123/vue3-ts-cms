const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
    lintOnSave: false,
    css: {
        requireModuleExtension: true
    },
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://152.136.185.210:4000',
                pathRewrite: {
                    '^/api': ''
                },
                changeOrigin: true
            }
        }
    },
    configureWebpack: {
        plugins: [
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver()],
            }),
            require('unplugin-element-plus/webpack')({
                // options
            })
        ]
    }

}