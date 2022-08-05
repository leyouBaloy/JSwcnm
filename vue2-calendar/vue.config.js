const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    proxy:{
      '/api':{
        // 目标路径
        target: 'https://656e-env-8gi24uylfeb71c40-1307751968.tcb.qcloud.la/',
        // 允许跨域
        changeOrigin: true,
        // 重写路径
        pathRewrite:{
          '^/api':''
        }
      }
    }
  }
})
