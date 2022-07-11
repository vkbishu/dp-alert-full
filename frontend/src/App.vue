<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import AuthService from "@/service/auth-service";
import {mapActions} from "vuex";
export default {
  name: "App",
 created(){
  // load user info via action
  // check for access key
  // if any, get user
  // if invalid access key, remove access key
  if(AuthService.isLoggedIn()){
    this.getUser();
  }
 },
 methods: {
   ...mapActions(['getUser'])
 }
}
</script>
<style>

</style>
