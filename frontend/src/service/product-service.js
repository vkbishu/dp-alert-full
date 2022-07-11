import http from './http-service';
import api from "@/config/url";

export default {
    getData(params={}){
        // get product list of user
        return http.get('/products/list', {params});
    },
    add(data){
        // add user product to watch list
        return http.post(api.add_product, data);
    },
    setAlert(data){
        // set price alert for product
        return http.post('/products/set-alert', data);
    },
    remove(pid){
        return http.post('/products/remove', {pid});
    }
}