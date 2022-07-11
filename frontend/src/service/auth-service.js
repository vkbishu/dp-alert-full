import http from "@/service/http-service";
export default {

    token_key: '_act',

    isLoggedIn(){
        return localStorage.getItem(this.token_key) ? true : false;
    },

    getUser(){
        return http.get('/users/me');
    },

    setToken(token){
        localStorage.removeItem(this.token_key);
        localStorage.setItem(this.token_key, token);
    },

    getToken(){
        return this.isLoggedIn() ? localStorage.getItem(this.token_key) : null;
    },

    logout(){
        return localStorage.removeItem(this.token_key);
    }
}