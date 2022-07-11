var express = require('express');
var router = express.Router();
const {ProxyApi, Setting} = require('../../models');

router.get('/', async function(req, res, next){
    try {
        let result = {};
        let settings = await Setting.findAll();
        for(let setting of settings){
            result[setting.setting_key] = setting.setting_value;
        }
        return res.data(result);
    }catch(err){
        console.log(err.message);
        next(err);
    }
});

router.post('/', async function(req, res, next){
    try {
        let setting_keys = ['enable_proxy', 'proxy_api_id'];
        for(let i of setting_keys){
            console.log(i);
            let setting = await Setting.findOne({
                where: {
                    setting_key: i
                }
            });

            if(setting){
                setting.setting_value = req.body[i];
                await setting.save();
            }else{
                await Setting.create({
                    setting_key: i,
                    setting_value: req.body[i]
                });
            }
        }
        return res.data({}, "Data successfully saved");
    }catch(err){
        console.log(err.message);
        next(err);
    }
});

router.get('/proxy_api', async function(req, res, next) {
  try{
    const result = await ProxyApi.findAll({
        order: [
          ['created_at', 'DESC']
        ]
    });
    return res.data(result);
  }catch(err){
    console.log(err.message);
    next(err);
  }
});

router.post('/proxy_api', async function(req, res, next) {
  try{
    const {name, url} = req.body;
    const result = await ProxyApi.create({
        name,
        url: url.trim()
    });
    return res.data(result);
  }catch(err){
    console.log(err.message);
    next(err);
  }
});

router.post('/proxy_api/:id', async function(req, res, next) {
    try{
    const {name, url} = req.body;
      const result = await ProxyApi.findByPk(req.params.id);
      result.name = name;
      result.url = url;
      await result.save();
      return res.data({}, "Successfully deleted");
    }catch(err){
      console.log(err.message);
      next(err);
    }
});

router.delete('/proxy_api/:id', async function(req, res, next) {
    try{
      const result = await ProxyApi.findByPk(req.params.id);
      await result.destroy();
      return res.data({}, "Successfully deleted");
    }catch(err){
      console.log(err.message);
      next(err);
    }
});

module.exports = router;