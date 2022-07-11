var express = require('express');
var router = express.Router();
const {Product, User, ProductUser} = require('../models');
const {clearPrice} = require('../helpers/utils');
const scrapper = require('../helpers/scrapper');
const auth = require('../middleware/auth');
const masterAuth = require('../middleware/masterAuth');
const ProductError = require('../error-class/ProductError');

// list user products
router.get('/list', auth, async function(req, res, next) {
  try{
      let {page} = req.query;
      let limit = 10;
      let offset = page > 0 ? (((page-1)*limit)) : 0;
      const result = await Product.findAll({
          include: {
              model: User,
              as: 'users',
              attributes: ['name','id'],
              where: {
                  id: req.user.id // user id
              },
              required: true
          },
          limit,
          offset,
          order: [
            ['users', ProductUser, 'updated_at', 'DESC']
          ]
      });

      return res.data(result);

  }catch(err){
    next(err);
  }
});

// add product
router.post('/add', masterAuth, async function(req, res, next) {
    try {
        const url = req.body.url;
        const seller = req.body.seller;
        const result = await Product.findOne({where: {url: url}});
        if(result){
          return res.data(result, "Product successfully added");
        }
        let item = {};
        switch(seller){
          case 'amazon':
            item = await scrapper.scrapeAmazon(url);
            break;
          case 'flipcart':
            item = await scrapper.scrapeFlipcart(url);
            break;
        }
        if(!item.offer_price){
          throw new ProductError("Unable to fetch product price");
        }
        let product = await Product.create({
            seller: seller,
            url: url,
            title: item.title,
            image: item.image,
            org_price: clearPrice(item.org_price),
            fetched_price: clearPrice(item.offer_price),
            current_price: clearPrice(item.offer_price),
        });
        return res.data(product, "Product successfully added");
    }catch(err){
      next(err);
    }
  });

  // set alert
router.post('/set-alert', auth, async function(req, res, next) {
  try {
      const product = await Product.findByPk(req.body.pid);
      const user = await User.findByPk(req.user.id); // user id 1
      await user.removeProduct(product);
      await user.addProduct(product, { through: { alert_price: req.body.alert_price }});
      const result = await product.getUsers({where: {id: 1}, attributes: ['id', 'name']});
     // console.log(result.toJSON());
      return res.data(result, 'Alert set successfully');

  }catch(err){
      next(err);
  }
});

 // remove prodct from user dashboard
 router.post('/remove', auth, async function(req, res, next) {
  try {
      const product = await Product.findByPk(req.body.pid);
      const user = await User.findByPk(req.user.id); // user id 1
      const isExist = await user.hasProduct(product);
      if(isExist){
        await user.removeProduct(product);
      }
      return res.data(null, 'Removed successfully');

  }catch(err){
      next(err);
  }
});

module.exports = router;
