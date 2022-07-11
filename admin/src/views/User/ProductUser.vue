<template>
    <div class="edit-product">
        <div class="row">
            <div class="col-sm-8">
                <card>
                    <template #header>
                        <h4 class="title">User Alerts</h4>
                    </template>
                    <table class="table tabel-striped">
                        <thead>
                            <tr>
                                <th>#ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Alert Price</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in users" :key="user.id">
                                <td>{{user.id}}</td>
                                <td>{{user.name}}</td>
                                <td>{{user.email}}</td>
                                <td>{{user.ProductUser.alert_price | moneyFormat}}</td>
                                <td>{{user.ProductUser.updatedAt | formatDate}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <infinite-loading @infinite="infiniteHandler" spinner="spiral"></infinite-loading>
                </card>
            </div>
            <div class="col-sm-4">
                <card>
                    <img :src="product.image" alt="">
                    <div class="pt-3">
                        <p>{{product.title}}</p>
                        <span class="badge badge-primary mr-3" v-if="product.affiliate">Affiliated</span>
                        <span class="badge badge-warning text-capitalize">{{product.seller}}</span>
                        <div class="pt-3">
                            <h4>{{product.org_price | moneyFormat}} <small class="text-primary">Original Price</small></h4>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="text-success">Fetched Price</div>
                                <h3>{{product.fetched_price | moneyFormat}}</h3>
                            </div>
                            <div class="col-sm-6">
                                 <div class="text-success">Offer Price</div>
                                <h3>{{product.current_price | moneyFormat}}</h3>
                            </div>
                            <div class="col-sm-12 text-secondary mb-3">
                                Last updated: {{product.updatedAt | timeAgo}}
                            </div>
                        </div>
                        <a class="btn btn-primary btn-sm btn-block" :href="product.url" target="_blank">View Product</a>
                    </div>
                </card>
            </div>
        </div>
    </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
export default {
    name: "product-user",
    components: {
        InfiniteLoading
    },
    data(){
        return {
            page: 1,
            product: {},
            users: [],
            loading: false,
        }
    },
    created(){
        // product
        if(this.$route.params.id){
            this.$http.get(`/admin/products/${this.$route.params.id}`)
            .then(res => {
                if(res.data.status === 'success'){
                    this.product = res.data.data;
                }
            }).catch(err => {
                console.log(err.message);
            })
        }
    },
    methods: {
       infiniteHandler($state){
        this.$http.get(`/admin/products/${this.$route.params.id}/alerts`, {params: {page: this.page}})
        .then(res => {
            if(res.data.data.length > 0){
                this.page += 1;
                this.users.push(...res.data.data);
                $state.loaded();
            }else{
                $state.complete();
            }
        });
      },
    }
}
</script>

<style lang="scss" scoped>

</style>