<template>
  <base-layout>
    <div class="mb-3 d-flex align-items-center justify-content-between">
        <h5>Alert List ({{itemCount}})</h5>
        <button class="btn btn-primary" @click.prevent="$router.push('/add')">Add New</button>
    </div>
     <div class="white_box">
         <div class="card-body">
             <div class="item-list">
                    <Product v-for="item of list" :key="item.id" :info="item" @remove="removeItem"/>
                    <infinite-loading @infinite="infiniteHandler" spinner="spiral"></infinite-loading>
             </div>
         </div>
     </div>
  </base-layout>
</template>

<script>
import ProductService from "@/service/product-service"
import Product from "@/components/Product"
import InfiniteLoading from 'vue-infinite-loading';
export default {
  name: 'Dashboard',
  components: {
      Product,
      InfiniteLoading
  },
  data(){
      return {
          list: [],
          page: 1,
      }
  },
  computed: {
      itemCount(){
          return this.list.length;
      }
  },
  created(){
      //this.loadData();
  },
  methods: {
      infiniteHandler($state){
          ProductService.getData({page: this.page})
          .then(res => {
              if(res.data.data.length > 0){
                  this.page += 1;
                  this.list.push(...res.data.data);
                  $state.loaded();
              }else{
                  $state.complete();
              }
          });
      },
      removeItem(id){
          this.list = this.list.filter(item => {
              return item.id !== id
          })
      }
  }
}
</script>

<style lang="scss" scoped>
.item {
    .title {
        font-weight: bold;
        font-size: 1.2rem;
    }

    .label {
        color: grey;
        text-transform: uppercase;
        font-weight: 500;
    }
    .price {
        font-weight: bold;
        font-size: 1.3rem;
    }
    .p-image {
        width: 160px;
        height: 160px;
        display: block;
        position: relative;
        overflow: hidden;
        //border: 1px solid #ddd;
        border-radius: 5px;
        img {
            position: absolute;
            width: 100%;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
        }
    }
}
</style>
