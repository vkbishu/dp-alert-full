const cheerio = require('cheerio');
const axios = require('axios');
const axiosRetry = require('axios-retry');
const ProductError = require('../error-class/ProductError');
const ProxySetting = require('../service/setting').proxy;

axiosRetry(axios, {
    retries: 2, // number of retries,
    retryDelay: (retryCount) => {
        console.log(`retry attempt: ${retryCount}`);
        return retryCount * 2000; // time interval between retries
    },
    retryCondition: (error) => {
        // if retry condition is not specified, by default idempotent requests are retried
        return error.response.status >= 500;
    },
});

const getPage = async (url) => {
    try {
        let page_url, config={};
        if(await ProxySetting.isProxyEnabled()){
            page_url = await ProxySetting.getProxyURL(url);
        }else{
            //page_url = 'http://api.scraperapi.com?api_key='+process.env.SCRAPPER_API_KEY+'&url='+url;
            page_url = url;
            config = {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36"
                },
            };
        }
        console.log(page_url);
        let result = await axios.get(page_url, config);
        return cheerio.load(result.data);
    }catch(err){
        throw new Error(err);
    }
};

const isValidAmazonURL = (url) => {
    let regex = new RegExp("https?://www.amazon.in/([\\w-]+/)?(dp|gp/product)/(\\w+/)?(\\w{10})");
    m = url.match(regex);
    if (m) {
        //console.log(m);
        return m[4];
    }
    return false;
};

const scrapeAmazon = async (url) => {
    if(!isValidAmazonURL(url)){
        throw new ProductError("Invalid product URL");
    }
    let title, image, offer_price, org_price, asin;
    try {
        const $ = await getPage(url);

        // asin
        /* let asin_script = $('script[data-a-state={"key":"acState"}]').html();
        if(asin_script && asin_script.length > 0){
            let asin_script_json = JSON.parse(asin_script);
            asin = asin_script_json.acAsin || null;
        } */

        //title
        title = $('#title > span#productTitle').text().trim();

        //image
        let image_script = $('script[data-a-state={"key":"desktop-landing-image-data"}]').html();
        if(image_script && image_script.length > 0){
            let image_script_json = JSON.parse(image_script);
            image = image_script_json.landingImageUrl;
        }else{
            image = $('#landingImage').attr('src');
        }

        // offer price
        offer_price = $('#corePrice_desktop .a-price.a-text-price.a-size-medium.apexPriceToPay > span.a-offscreen').text();
        if(!offer_price){
            offer_price = $('#centerCol .a-price[data-a-color=base] span.a-offscreen').text();
        }
        if(!offer_price){
            offer_price = $('#centerCol .a-price[data-a-color=price] span.a-offscreen').text();
        }
        // offer price from amazon right side
        if(!offer_price){
            offer_price = $('#buybox .a-size-medium.a-color-price.offer-price.price3P').text();
        }
        // kindle price
        if(!offer_price){
            offer_price = $('#buybox #kindle-price').text();
        }
        if(offer_price){
            offer_price = offer_price.trim();
        }

        // original price
        org_price = $('td.a-span12.a-color-secondary.a-size-base .a-price.a-text-price.a-size-base > span.a-offscreen').text();
        if(!org_price){
            org_price = $('#centerCol .a-price[data-a-color=secondary] span.a-offscreen').text();
        }
        // price from right panel
        if(!org_price){
            org_price = $('#buybox .a-color-secondary.a-text-strike').text();
        }
        if(!org_price){
            org_price = $('#buybox #print-list-price').text();
        }
        if(org_price){
            org_price = org_price.trim();
        }
        if(org_price == ''){
            org_price = offer_price;
        }
        return {
            title,
            image,
            offer_price,
            org_price
        };
    }catch(err){
        throw new Error(err);
    }
};


const scrapeFlipcart = async (url) => {
    /**
     *  Images are not getting loaded for cloth and footwear items.
     *  Images are loaded via javascript, need to add support for that also
     */
    try {
        const $ = await getPage(url);
        let title = $('.B_NuCI').text().trim();
        let image = $('._396cs4._2amPTt._3qGmMb._3exPp9').attr('src');
        let offer_price = $('._30jeq3._16Jk6d').text().trim();
        let org_price = $('._3I9_wc._2p6lqe').text().trim();
        if(!image){
            image = $('._312yBx.SFzpgZ img._2r_T1I._396QI4').attr('src'); // javascript based image
        }
        return {
            title,
            image,
            offer_price,
            org_price
        };
    }catch(err){
        throw new Error(err.message);
    }
};


/* const scrapeSnapDeal = (url) => {

}; */


module.exports = {
    scrapeAmazon,
    scrapeFlipcart
};



