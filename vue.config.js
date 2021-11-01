const { IP_ENV } = process.env
const axios_default_ip = IP_ENV == 'local' 
? 'http://10.0.0.13:8181' : (IP_ENV == 'test' 
? 'http://test-api-home.qunweipai.cn' : 'http://api-home.qunweipai.cn')
process.env.VUE_APP_BASE_URL = axios_default_ip

const Timestamp = new Date().getTime();
module.exports = {
    chainWebpack:config => {
        if (process.env.NODE_ENV === 'production') {
            config.output.filename('js/[name].' + Timestamp + '.js').end();
            config.output.chunkFilename('js/[name].' + Timestamp + '.js').end();
        }
    },
    publicPath:'./',
    outputDir:'admin-web',
    assetsDir:'static',
    indexPath:'index.html',
    productionSourceMap:process.env.NODE_ENV === 'development',
}