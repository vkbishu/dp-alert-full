//const { parentPort } = require('worker_threads');
const {Product,QueueTask, Sequelize} = require('../models');
const {Op} = Sequelize;
const {clearPrice} = require('../helpers/utils');
const scrapper = require('../helpers/scrapper');
const email = require('../emails/email');

console.log('Scrapping Start...');

const getProducts = async (offset, limit) => {
    const products = await Product.findAll({limit, offset});
    return products;
};

const scrapeProduct = async (products) => {
    products.forEach(async (product) => {
        console.log('Scraping started: ', product.url);
        let item;
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
            // add product price to price change history
            await product.createPriceChangeHistory({price: product.current_price});
        }

        console.log('Fetched Price: ', offer_price);
        if(price_change){
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
    });
};

let offset = 0;
let limit = 4; // API concurrent request
let interval = setInterval(async () => {
    let products = await getProducts(offset, limit);
    if(products.length == 0){
        clearInterval(interval);
        offset = 0;
        console.log('Stopped');
        return;
    }
    offset += limit;
    try {
        await scrapeProduct(products);
    }catch(err){
        console.log(err.message);
    }
    
}, (60*1000));
