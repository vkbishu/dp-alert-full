var express = require('express');
const path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("Hello world");
  res.sendFile(path.join(__dirname, '..', '/public/index.html'));
});

router.get('/signup/:token', function(req, res, next) {
    const isValidToken = true;
    const signupPage = `/#/signup/${req.params.token}`;
    const indexPage = '/';
    if(!isValidToken){
      return res.redirect(indexPage);
    }
    return res.redirect(signupPage);
});




/* router.get('/refresh', async function(req, res) {
  try {
      // fetch all products
      // iterate through product
      // check the current price of the product
      // if the price is less than the stored price:
        // i) update current_price
        // ii) send notification to end user via email, message, push notification (later), system notification
        // iii) track price changes of product
      const all_products = await Product.findAll(); 
      all_products.forEach(async item => {
        let product;
        switch(item.source){
          case 'amazon':
            product = await scrapper.scrapeAmazon(item.url);
            break;
          case 'flipcart':
            product = await scrapper.scrapeFlipcart(item.url);
            break;
        }

        if(item.current_price !== product.offer_price){
          item.current_price = product.offer_price;
          item.save();
        }
        item.current_price = product.offer_price;
        item.save();
        console.log("Refreshed item -  ID: ", item.id, " , URL: ", item.url);
      });
      res.send("Successfully executed");
  }catch(err){
    console.log(err);
  }
  //res.send("Successfully refresh at ", Date.now());
}); */


module.exports = router;
