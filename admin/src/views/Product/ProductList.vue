<template>
  <div class="product-list">
      <div class="row">
          <div class="col-sm-12">
              <card>
                  <template #header>
                      <div class="d-flex align-items-center justify-content-between">
                        <h4 class="title">Product List</h4>
                        <div>
                            <button class="btn btn-primary btn-sm" @click.prevent="$router.push('/product/add')">Add Product</button>
                        </div>
                      </div>
                  </template>
                  <table class="table table-striped">
                      <thead>
                          <tr>
                              <th style="width: 5%">#ID</th>
                              <th style="width: 40%">Product</th>
                              <th style="width: 10%" class="text-center">Seller</th>
                              <th style="width: 10%" class="text-center">Fetched Price</th>
                              <th style="width: 10%" class="text-center">Offer Price</th>
                              <th style="width: 10%" class="text-right">Action</th>
                          </tr>
                      </thead>
                      <tbody>
                          <product-row v-for="item of list" :key="'product-'+item.id" :item="item" @product:delete="removeItem"></product-row>
                      </tbody>
                  </table>
                  <infinite-loading @infinite="infiniteHandler" spinner="spiral"></infinite-loading>
              </card>
          </div>
      </div>
      
  </div>
  
</template>
<script>
import ProductRow from "@/views/Product/ProductRow"
import InfiniteLoading from 'vue-infinite-loading';
export default {
  name: 'product-list',
  components: {
      ProductRow,
      InfiniteLoading
  },
  data() {
    return {
        page: 1,
        list: []
    };
  },
  created(){
      // intital loading
  },
  methods: {
    infiniteHandler($state){
        this.$http.get('/admin/products', {params: {page: this.page}})
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
      removeItem(product){
          this.list = this.list.filter(item => {
              return item.id !== product.id;
          });
      }
  }
};
</script>
<style lang="scss">
.p-title {
    color: inherit;
}
.product-image {
    flex-basis: content;
    margin-right: 1rem;
    img {
        width: 120px;
        height: 120px;
        max-width: none;
        object-fit: cover;
    }
}
</style>
