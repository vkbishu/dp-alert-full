<template>
  <div class="breadcrum_box">
    <ul>
      <li v-for="(p, index) of path" :key="index">{{p}}</li>
      <li class="welcom" valign="bottom" align="middle" width="120">
        Welcome！
      </li>
      <li valign="bottom">
        <a href="https://www.gxgroup.eu/" target="_blank">
          <img
            width="20"
            height="20"
            border="0"
            align="center"
            src="/img/GX_Group.png"
            style="vertical-align: middle; margin: 0px 7px"
        /></a>
      </li>
      <li valign="bottom">
        <a href="https://www.facebook.com/gxgroup.eu" target="_blank">
          <img
            width="20"
            height="20"
            border="0"
            align="center"
            src="/img/facebook.png"
            style="vertical-align: middle; margin: 0px 7px"
        /></a>
      </li>
      <a href="https://www.facebook.com/gxgroup.eu" target="_blank"> </a>
      <li valign="bottom">
        <a href="https://www.facebook.com/gxgroup.eu" target="_blank"></a
        ><a href="https://www.linkedin.com/company/gxgroup/" target="_blank">
          <img
            width="20"
            height="20"
            border="0"
            align="center"
            src="/img/linkedin.png"
            style="vertical-align: middle; margin: 0px 7px"
        /></a>
      </li>
      <li valign="bottom">
        <a href="https://twitter.com/gxgroup_eu" target="_blank">
          <img
            width="20"
            height="20"
            border="0"
            align="center"
            src="/img/twitter.png"
            style="vertical-align: middle; margin: 0px 7px"
        /></a>
      </li>
      <a href="https://twitter.com/gxgroup_eu" target="_blank"> </a>
    </ul>
    <a href="https://twitter.com/gxgroup_eu" target="_blank"> </a>
    <div class="help_icon">
      <a href="https://twitter.com/gxgroup_eu" target="_blank"> </a
      ><a href="/cgi-bin/help_content.asp#content" target="_blank">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="38"
          height="38"
          viewBox="0 0 38 38"
        >
          <path
            id="help_Icon"
            data-name="help_Icon"
            class="cls-1"
            d="M18.746,0A19,19,0,1,0,38,18.744,19,19,0,0,0,18.746,0ZM18.69,30.565l-0.1,0a2.766,2.766,0,0,1,.065-5.531l0.094,0A2.766,2.766,0,1,1,18.69,30.565Zm6.8-13.49a12.558,12.558,0,0,1-2.268,2.031l-1.16.8a3.147,3.147,0,0,0-1.165,1.418,2.933,2.933,0,0,0-.18,1.19l0,0.186H16.286l0.013-.375c0.054-1.54.092-2.446,0.73-3.194a18.823,18.823,0,0,1,3.3-2.658,3.485,3.485,0,0,0,.782-0.8,2.816,2.816,0,0,0,.67-1.641,3.2,3.2,0,0,0-.608-1.89,2.531,2.531,0,0,0-2.19-.823,2.389,2.389,0,0,0-2.213,1.023,4.112,4.112,0,0,0-.67,2.21v0.189H11.539l0.008-.2c0.118-2.8,1.116-4.809,2.965-5.984a7.809,7.809,0,0,1,4.295-1.127,9.269,9.269,0,0,1,5.54,1.595A5.531,5.531,0,0,1,26.587,13.8,5.461,5.461,0,0,1,25.487,17.076Z"
          ></path>
        </svg>
      </a>
    </div>
  </div>
</template>
<script>
export default {
    name: "Breadcrumb",
    data(){
      return {
        path: []
      }
    },
    created(){
      this.path = this.$route.meta.path || [];
    },
    watch: {
      $route (to){
          this.path = to.meta.path || [];
      }
    }
};
</script>

<style lang="scss" scoped>
.breadcrum_box {
    padding: 8px 12px;
    background: #fdfdfd;
    box-shadow: 0px 0px 6px rgb(0 0 0 / 10%);
    position: relative;
}
.breadcrum_box ul {
    margin: 0px;
    padding: 0px;
    list-style: none;
}

.breadcrum_box ul li {
    display: inline-block;
    padding: 0px 15px;
    color: #a4a6a9;
    font-size: 13px;
}

.breadcrum_box ul li a {
    color: #fd6102;
    text-decoration: none;
}
.help_icon {
    position: absolute;
    right: 14px;
    top: 7px;
}
.help_icon svg {
    width: 25px;
    height: auto;
    fill: #1aa8ff;
}
</style>