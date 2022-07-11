module.exports = {
    devServer: {
        proxy: 'http://localhost:3000/'
    },
    outputDir: '../server/public',
    assetsDir: 'assets',
    productionSourceMap: false,
    chainWebpack: config => {
        config.plugin('copy').tap(([options]) => {
            options[0].ignore.push('data/**/*')
            return [options]
          })
    }
}