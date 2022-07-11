import http from './http-service';
import api from "@/config/url";

export default {
    getDeviceInfo(){
        // fetch device info
        return http.get(api.status.device_info);
    },
    getNetInfo(){
        // fetch net info
        return http.get(api.status.net_info);
    },
    getUserInfo(){
        // fetch user info
        return http.get(api.status.user_info);
    },
    getVoipInfo(){
        // fetch voip info
        return http.get(api.status.voip_info);
    },
    getCwmpStatus(){
        // fetch Cwmp info
        return http.get(api.status.cwmp_status);
    }
}