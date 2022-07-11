// root actions
//import http from "@/service/http-service";
import statusDataService from "@/service/status-service";
import authService from "@/service/auth-service";
export default {
    loadDeviceInfo({commit}){
        statusDataService
        .getDeviceInfo()
        .then(res => {
            commit('setDevice', res.data.data);
        });
    },

    setUser({commit}, {token, user}){
        authService.setToken(token);
        commit('SET_USER',user);
    },

    unsetUser({commit}){
        authService.logout();
        commit('UNSET_USER');
    },

    getUser({commit}){
        authService.getUser()
        .then(res => {
            commit('SET_USER',res.data.data);
        });
    }
}