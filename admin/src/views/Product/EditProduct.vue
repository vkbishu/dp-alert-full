<template>
    <div class="edit-product">
        <div class="row">
            <div class="col-sm-8">
                <product-form :info="product" :key="add_key" @update="setProduct"></product-form>
            </div>
            <div class="col-sm-4">
                <card v-if="product && product.id">
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
import ProductForm from "./ProductForm"
export default {
    name: "edit-product",
    components: {
        ProductForm
    },
    data(){
        return {
            product: {},
            add_key: new Date().getTime(),
            loading: false,
        }
    },
    created(){
        if(this.$route.params.id){
            this.$http.get(`/admin/products/${this.$route.params.id}`)
            .then(res => {
                if(res.data.status === 'success'){
                    this.product = res.data.data;
                    this.add_key++;
                }
            }).catch(err => {
                console.log(err.message);
            })
        }
    },
    methods: {
        setProduct(product){
            this.product = product;
        }
    }
}
</script>

<style lang="scss" scoped>

</style>