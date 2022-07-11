const {Setting, ProxyApi} = require('../models');

module.exports = {
    proxy: {
        async isProxyEnabled(){
            let result = await Setting.findOne({
                where: {
                    setting_key: 'enable_proxy'
                }
            });
            if(result && result.setting_value === 'yes'){
                return true;
            }else{
                return false;
            }
        },
        async getProxyURL(url){
            //return 'http://api.scraperapi.com?api_key=4d0fe324c38d613fa8c28e90235974b6&url='+url;
            let proxy_id = await Setting.findOne({
                where: {
                    setting_key: 'proxy_api_id'
                }
            });
            if(proxy_id){
                let proxy_api = await ProxyApi.findByPk(proxy_id.setting_value);
                if(proxy_api){
                    return proxy_api.url + url;
                }
            }
            return url;
        }
    }
}