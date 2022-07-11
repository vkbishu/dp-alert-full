<template>
<base-layout>
    <div>
        <!-- add new-->
     <div class="row">
        <div class="col-sm-10">
            <div class="input-group">
                <div class="input-group-text p-0">
                    <select name="" class="form-select border-0" v-model="seller">
                        <option value="amazon">Amazon.in</option>
                        <option value="flipcart">Flipcart</option>
                        <!-- <option value="snapdeal">Snapdeal</option>
                        <option value="myntra">Myntra</option> -->
                    </select>
                </div>
                <input type="text" class="form-control" placeholder="Paste or Enter product URL here..." v-model="url">
            </div>
        </div>
        <div class="col-sm-2">
            <button class="btn btn-primary w-100" @click.prevent="add" :disabled="loading"><span v-if="loading">Loading...</span><span v-else>Find Product</span></button>
        </div>
     </div>
    
    <div class="white_box" v-if="result !== null">
        <div class="card-body">
            <Product :set-alert="true" :info="result" @alertPriceSet="$router.push('/dashboard')"/>
        </div>
    </div>

    </div>
</base-layout>
</template>

<script>
import ProductService from "@/service/product-service"
import Product from "@/components/Product"
export default {
    name:"AddProduct",
    components: {
        Product
    },
    data(){
        return {
            seller: 'amazon',
            url: '',
            result: null,
            loading: false
        }
    },
    methods: {
        add(){
            if(this.url.trim().length === 0){
                return false;
            }
            this.loading = true;
            ProductService
            .add({url: this.url, seller: this.seller})
            .then(res => {
                this.result = res.data.data;
                this.loading = false;
            }).catch(() => {
                this.loading = false;
            })
        }
    }
}
</script>

<style lang="scss" scoped>
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
</style>