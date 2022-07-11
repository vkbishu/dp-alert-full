export default {
    token_key: '_act_m',
    isLoggedIn(){
        return sessionStorage.getItem(this.token_key) ? true : false;
    },

    logUser(data){
        console.log(data);
        sessionStorage.removeItem(this.token_key);
        sessionStorage.setItem(this.token_key, data.token);
        sessionStorage.setItem('_usr', JSON.stringify(data.user));
    },

    getToken(){
        return this.isLoggedIn() ? sessionStorage.getItem(this.token_key) : null;
    },

    getUser(){
        return this.isLoggedIn() ? JSON.parse(sessionStorage.getItem('_usr')) : null;
    },

    logout(){
       sessionStorage.removeItem(this.token_key); 
       sessionStorage.removeItem('_usr'); 
       return true;
    }
}