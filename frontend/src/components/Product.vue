<template>
    <div class="row item align-items-center mb-5">
        <div class="col-sm-2">
        <div class="p-image-wrapper position-relative">
            <a :href="product.url" class="p-image m-auto" target="_blank">
                <img :src="product.image" alt="">
            </a>
        </div>
        </div>
        <div class="col-sm-8">
            <div>
        <div class="title">{{product.title}}</div>
        <div class="text-secondary mb-3">Last Fetched: <span v-if="product.users">{{product.updatedAt | timeAgo}}</span> <span class="badge bg-warning text-capitalize">{{this.product.seller}}</span></div>
        <div class="row">
            <div class="col-sm-4">
                <div class="fetched-price">
                    <div class="label">Fetched Price</div>
                    <div class="price text-dark">{{product.fetched_price | moneyFormat}}</div>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="offer-price">
                    <div class="label">Current Price</div>
                    <div class="price text-success">{{product.current_price | moneyFormat}}</div>
                </div>
            </div>
            <div class="col-sm-4" v-if="product.users">
                <div class="alert-price">
                    <div class="label">Alert Price</div>
                    <div class="price text-danger">{{product.users[0].ProductUser.alert_price | moneyFormat}}</div>
                </div>
            </div>
        </div>
        </div>
        </div>
        <div class="col-sm-2 p-0">
            <div v-if="set_alert">
                <input type="number" class="form-control" placeholder="Alert Price" v-model="alert_price">
                <button class="btn w-100 btn-rounded btn-primary mt-2 w-100" @click="setAlertPrice">Set Alert</button>
            </div>
            <div v-else>
                <a class="btn w-100 btn-rounded btn-primary mb-2" :href="info.url" target="_blank">Buy now</a>
                <button class="btn w-100 btn-rounded btn-primary mb-2" @click.prevent="set_alert=true">Change Price Alert</button>
                <button class="btn w-100 btn-rounded btn-primary" @click.prevent="remove">Remove Item</button>
            </div>
        </div>
    </div>
</template>

<script>
import ProductService from "@/service/product-service"
export default {
    name: "Product",
    props: ['setAlert', "info"],
    data(){
        return {
            alert_price: 0,
            set_alert: false,
            product: this.info
        }
    },
    created(){
        if(this.setAlert){
            this.set_alert = true;
        }
        this.alert_price = this.product.users ? this.product.users[0].ProductUser.alert_price : this.info.current_price;
    },
    methods: {
        setAlertPrice(){
            if(this.alert_price.length == 0 || this.alert_price <= 0){
                return false;
            }
            ProductService
            .setAlert({pid: this.product.id, alert_price: this.alert_price})
            .then(res => {
                this.product.users = res.data.data;
                this.set_alert = false;
                this.$emit('alertPriceSet', this.alert_price);
            });
        },
        remove(){
            ProductService
            .remove(this.product.id)
            .then(() => {
                this.$emit('remove', this.product.id);
            })
        }
    },
    filters: {
        moneyFormat(val){
            return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'INR' }).format(val);
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