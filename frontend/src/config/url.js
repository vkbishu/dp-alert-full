const dev_url = {
    get_product_list: '',
    set_price_alert: '',
    delete_product: '',
    add_product: '/products/add'
};
const prod_url = {
    get_product_list: '',
    set_price_alert: '',
    delete_product: '',
    add_product: '/products/add'
};
let url;
if(process.env.NODE_ENV === 'development'){
    url = dev_url;
}else{
    url = prod_url;
}

export default url;