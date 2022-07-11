<template>
    <card>
        <template #header>
            <h4 class="title">{{product.id ? 'Edit' : 'Add'}} Product</h4>
        </template>
        <div class="row">
            <div class="col-sm-3">
                  <div class="form-group">
                      <label for="">Seller</label>
                      <select v-model="product.seller" class="form-control" :disabled="product.id">
                          <option value="amazon">Amazon.in</option>
                          <option value="flipcart">Flipcart</option>
                      </select>
                  </div>
              </div>
             <div class="col-sm-9 position-relative">
                    <base-input label="Product URL"
                        placeholder="Product URL"
                        v-model="product.url"
                         :disabled="product.id"
                        >
                </base-input>
                <button class="btn btn-sm" style="position: absolute; right: 21px; top: 26px" @click.prevent="fetchProduct" :disabled="product.id || loading"><span v-if="loading">Fetching...</span><span v-else>Fetch</span></button>
            </div>
        </div>
        <div class="row" v-if="product.id">
            <div class="col-sm-12">
                <base-input label="Title"
                        placeholder="Title"
                        v-model="product.title"
                        >
                </base-input>
            </div>
                <div class="col-sm-12">
                <base-input label="Image URL"
                        placeholder="Image URL"
                        v-model="product.image"
                        >
                </base-input>
            </div>
            <div class="col-sm-4">
                <base-input label="Original Price"
                        placeholder="Original Price"
                        v-model="product.org_price"
                        type="number"
                        >
                </base-input>
            </div>
            <div class="col-sm-4">
                    <base-input label="Fetched Price"
                        placeholder="Fetched Price"
                        type="number"
                        v-model="product.fetched_price"
                        >
                </base-input>
            </div>
            <div class="col-sm-4">
                    <base-input label="Offer Price"
                        placeholder="Offer Price"
                        v-model="product.current_price"
                        type="number"
                        >
                </base-input>
            </div>
            <div class="col-sm-12">
                    <base-input label="Affiliate Link"
                        placeholder="Affiliate Link"
                        v-model="product.affiliate"
                        >
                </base-input>
            </div>
        </div>
        <div v-if="product.id">
            <base-button class="mr-2" slot="footer" type="primary" fill @click.prevent="submit" :disabled="loading"><span v-if="loading">Loading...</span><span v-else>Save</span></base-button>

            <base-button slot="footer" type="danger" fill @click.prevent="$router.push('/product')" :disabled="loading">Cancel</base-button>
        </div>
    </card>
</template>
<style lang="scss" scoped>

</style>
<script>
export default {
    name: "product-form",
    data(){
        return {
            loading: false,
            product: {
                title: '',
                image: '',
                org_price: 0,
                fetched_price: 0,
                current_price: 0,
                affiliate: '',
                url: '',
                seller: 'amazon'
            }
        }
    },
    props: {
        info: Object
    },
    created(){
        if(this.info && this.info.id){
            this.product = this.info;
        }
    },
    methods: {
        submit(){
           this.updateProduct();
        },
        fetchProduct(){
            if(this.product.url.trim().length === 0){
                return false;
            }
            this.loading = true;
            return this.$http.post(`/products/add`, this.product)
            .then(res => {
                if(res.data.status === 'success'){
                    this.product = res.data.data;
                    this.loading = false;
                     this.$notify({
                        message: res.data.message,
                        icon: "tim-icons icon-bell-55",
                        horizontalAlign: 'center',
                        verticalAlign: 'top',
                        type: 'success',
                        timeout: 3000 // 3 seconds
                    });
                }
            })
            .catch(err => {
                this.$notify({
                    message: err.message,
                    icon: "tim-icons icon-bell-55",
                    horizontalAlign: 'center',
                    verticalAlign: 'top',
                    type: 'danger',
                    timeout: 3000 // 3 seconds
                });
                this.loading = false;
            })
        },
        updateProduct(){
            this.loading = true;
            return this.$http.post(`/admin/products/${this.product.id}`, this.product)
            .then(res => {
                if(res.data.status === 'success'){
                    //this.product = res.data.data;
                    this.loading = false;
                     this.$notify({
                        message: res.data.message,
                        icon: "tim-icons icon-bell-55",
                        horizontalAlign: 'center',
                        verticalAlign: 'top',
                        type: 'success',
                        timeout: 3000 // 3 seconds
                    });
                    this.$emit('update', res.data.data);
                }
            })
            .catch(err => {
                this.$notify({
                    message: err.message,
                    icon: "tim-icons icon-bell-55",
                    horizontalAlign: 'center',
                    verticalAlign: 'top',
                    type: 'danger',
                    timeout: 3000 // 3 seconds
                });
                this.loading = false;
            })
        }
    }
}
</script>

<style lang="scss" scoped>
select {
    option {
       color: black;
    }
}
</style>