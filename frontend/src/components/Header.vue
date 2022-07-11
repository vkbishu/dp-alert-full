<template>
    <div class="header d-flex justify-content-between align-items-center ps-3 pe-3">
        <div class="p-2">
            <a href="/">
            <img src="@/assets/logo.png" alt="" class="img">
            </a>
            <!-- <i class="fa fa-bars ms-3 border tsc" @click.prevent="$emit('toggle')"></i> -->
        </div>
        <div class="d-flex" v-if="user">
            <div class="model_box header-padding">{{user.name}}</div>
            <router-link class="logout home" to="/dashboard">
                 <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">
                <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"/>
                </svg>
            </router-link>
            <router-link class="logout add-product" to="/add">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                </svg>
            </router-link>
            <a href="#" class="logout" @click.prevent="logout">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="25" viewBox="0 0 22 25">
                    <path id="power_icon" data-name="power_icon" class="cls-1" d="M15.405,3.524s-1.324-.6-1.324.8A3.166,3.166,0,0,0,15.41,6.65,8.495,8.495,0,0,1,11,22.253,8.495,8.495,0,0,1,6.59,6.65,3.167,3.167,0,0,0,7.919,4.322c0-1.4-1.324-.8-1.324-0.8A11.242,11.242,0,0,0,11,25,11.242,11.242,0,0,0,15.405,3.524ZM11.077,0A1.47,1.47,0,0,0,9.46,1.258V12.325a1.47,1.47,0,0,0,1.618,1.258,1.3,1.3,0,0,0,1.463-1.258V1.258A1.3,1.3,0,0,0,11.077,0Z"></path>
                </svg>
            </a>
        </div>
        <div v-else>
            <router-link class="btn btn-primary btn-min-w" to="/login">
                Login
            </router-link>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
    name: "Header",
    computed: {
        ...mapState(['user']),
    },
    methods: {
        ...mapActions(['unsetUser']),
        logout(){
            this.unsetUser();
            this.$router.push('/');
        }
    }
}
</script>

<style lang="scss">
.tsc {
    font-size: 1.5rem !important;
    cursor: pointer;
    border: 1px solid #ddd;
    padding: 4px 12px;
    border-radius: 5px;

    &:hover {
        box-shadow: 1px 1px 4px 2px #e9e6e6;
    }
}
.header {
    background: #FFF;
    color: #678098;
    box-shadow: 0px 0px 6px rgb(0 0 0 / 10%);
}
.header-padding{
    padding: 15px 25px;
}

.gateway_box {
    border-left: solid 1px #eeeeee;
    font-size: 13px;
}
</style>