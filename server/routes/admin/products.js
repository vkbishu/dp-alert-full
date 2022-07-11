var express = require('express');
var router = express.Router();
const {Product, QueueTask, Sequelize} = require('../../models');
const {Op} = Sequelize;
const {clearPrice} = require('../../helpers/utils');
const scrapper = require('../../helpers/scrapper');
const ProductError = require('../../error-class/ProductError');
const email = require('../../emails/email');
// list user products
router.get('/', async function(req, res, next) {
  try{
      let {page} = req.query;
      let limit = 30;
      let offset = page > 0 ? (((page-1)*limit)) : 0;
      const result = await Product.findAll({
          limit,
          offset,
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

router.get('/:id', async function(req, res, next) {
    try{
        let pk = req.params.id;
        const result = await Product.findByPk(pk);
        return res.data(result);

    }catch(err){
        console.log(err.message);
        next(err);
    }
});

router.get('/:id/alerts', async function(req, res, next) {
    try{
        let {page} = req.query;
        let limit = 30;
        let offset = page > 0 ? (((page-1)*limit)) : 0;
        let pk = req.params.id;
        const result = await Product.findByPk(pk);
        const users = await result.getUsers({
            attributes: ['id', 'name', 'email'],
            limit,
            offset
        });
        return res.data(users);

    }catch(err){
        console.log(err.message);
        next(err);
    }
});

router.post('/:id/set-affiliate', async function(req, res, next) {
    try{
        let pk = req.params.id;
        const result = await Product.findByPk(pk);
        result.affiliate = req.body.affiliate;
        await result.save();
        return res.data(result, "Data successfully updated");

    }catch(err){
        console.log(err.message);
        next(err);
    }
});

router.post('/:id', async function(req, res, next){
    try{
        let pk = req.params.id;
        let fields = req.body;
        let allowed_fields = ['affiliate', 'image', 'fetched_price', 'org_price', 'current_price', 'title'];
        const result = await Product.findByPk(pk);
        for(let i of allowed_fields){
            if(i in fields){
                result[i] = fields[i];
            }
        }
        await result.save();
        return res.data(result, "Data successfully updated");

    }catch(err){
        console.log(err.message);
        next(err);
    }
});

router.delete('/:id', async function(req, res, next){
    try{
        let pk = req.params.id;
        const result = await Product.findByPk(pk);
        if(result && result.id){
            const users = await result.countUsers();
            if(users > 0){
                return res.error(null, "Unable to delete: "+ users + " alerts have been set for this product.");
            }else{
                await result.destroy();
            }
        }
        return res.data(null, "Data successfully removed");

    }catch(err){
        console.log(err.message);
        next(err);
    }
});

router.post('/:id/fetch', async function(req, res, next) {
    try{
        let pk = req.params.id;
        const product = await Product.findByPk(pk);
        let item = {};
        switch(product.seller){
            case 'amazon':
            item = await scrapper.scrapeAmazon(product.url);
            break;
            case 'flipcart':
            item = await scrapper.scrapeFlipcart(product.url);
            break;
        }

        const offer_price = clearPrice(item.offer_price);
        const org_price = clearPrice(item.org_price);
        let price_change = false;
        if(!product.image && item.image && item.image.length > 0){
            product.image = item.image;
        }

        if(product.org_price == 0 && org_price != 0){
            product.org_price = org_price;
        }

        if(offer_price && !isNaN(offer_price)){
            if(product.fetched_price == 0){
                product.fetched_price = offer_price;
            }
            if(offer_price != product.current_price){
                product.current_price = offer_price;
                price_change = true;
            }
        }
        await product.save();
        let change_history = await product.countPriceChangeHistories({
            where: {
                [Op.and]: [
                    {price: product.current_price},
                    Sequelize.where(Sequelize.fn('DATE', Sequelize.col('created_at')), '2022-02-05')
                ]
            }
        });
        if(!change_history){
            await product.createPriceChangeHistory({price: product.current_price});
        }

        if(price_change){
            // add product price to price change history
            const users = await product.getUsers();
            users.forEach(async (user) => {
                if(offer_price <= user.ProductUser.alert_price){

                    const locals = {
                        name: user.name,
                        title: product.title,
                        offer_price: item.offer_price,
                        url: product.url,
                    };

                    const parsed = await Promise.all([
                        email.render('price-drop/subject', locals),
                        email.render('price-drop/html', locals),
                        email.render('price-drop/text', locals),
                    ]);

                    // add email notification to queue
                    await QueueTask.create({
                        job: 'email',
                        data: {
                            to: user.email,
                            subject: parsed[0],
                            message: parsed[1]
                        }
                    });

                   // add sms notification to queue
                    await QueueTask.create({
                        job: 'sms',
                        data: {
                            to: '7903677303',
                            message: parsed[2]
                        }
                    });
                }
            });
        }
        return res.data(product, "Data successfully fetched");

    }catch(err){
        console.log(err.message);
        next(err);
    }
});


module.exports = router;
