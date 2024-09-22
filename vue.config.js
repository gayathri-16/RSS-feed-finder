const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    optimization: {
      minimize: false, // Disable minification for debugging
    }
  }
})
