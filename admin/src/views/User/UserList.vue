<template>
  <div class="product-list">
      <div class="row">
          <div class="col-sm-12">
              <card>
                  <template #header>
                      <div class="d-flex align-items-center justify-content-between">
                        <h4 class="title">User List</h4>
                      </div>
                  </template>
                  <table class="table table-striped">
                      <thead>
                            <tr>
                              <th>#ID</th>
                              <th>Name</th>
                              <th>Email</th>
                              <th class="text-center">Registered On</th>
                              <th class="text-right">Action</th>
                            </tr>
                      </thead>
                      <tbody>
                          <tr v-for="item in list" :key="item.id">
                              <td>{{item.id}}</td>
                              <td>{{item.name}}</td>
                              <td>{{item.email}}</td>
                              <td class="text-center">{{item.createdAt | formatDate}}</td>
                              <td class="text-right">-</td>
                          </tr>
                      </tbody>
                  </table>
                  <infinite-loading @infinite="infiniteHandler" spinner="spiral"></infinite-loading>
              </card>
          </div>
      </div>
      
  </div>
  
</template>
<script>
import InfiniteLoading from 'vue-infinite-loading';
export default {
    name: 'user-list',
    components: {
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
            this.$http.get('/admin/users', {params: {page: this.page}})
            .then(res => {
                if(res.data.data.length > 0){
                    this.page += 1;
                    this.list.push(...res.data.data);
                    $state.loaded();
                }else{
                    $state.complete();
                }
            });
        }
    }
};
</script>
<style lang="scss">

</style>
