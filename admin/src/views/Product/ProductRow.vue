<template>
    <tr v-if="isLoading">
        <td>
           <VueSkeletonLoader
            :width="50"
            :height="30"
            animation="fade"
            />
        </td>
        <td>
            <div class="d-flex align-items-center">
                <div class="mr-2">
                <VueSkeletonLoader
                    :width="100"
                    :height="100"
                    animation="fade"
                />
                </div>
                <div>
                    <div class="mb-3"><VueSkeletonLoader
                        :height="30"
                        :width="280"
                        animation="fade"
                    />
                    </div>
                    <VueSkeletonLoader
                    :height="20"
                    animation="fade"
                    />
                </div>
            </div>
        </td>
        <td>
            <VueSkeletonLoader
            :height="20"
                :width="60"
            animation="fade"
            />
        </td>
        <td>
            <VueSkeletonLoader
            :height="20"
            :width="60"
            animation="fade"
            />
        </td>
        <td>
            <VueSkeletonLoader
            :height="20"
            :width="60"
            animation="fade"
            />
        </td>
        <td>
            <VueSkeletonLoader
            :height="20"
            :width="60"
            animation="fade"
            />
        </td>
    </tr>
    <tr v-else>
        <td>{{product.id}}</td>
        <td>
            <div class="d-flex align-items-center">
                <div class="product-image"><img :src="product.image" alt=""></div>
                <div>
                    <div class="mb-3"><a :href="product.url" target="_blank" class="p-title">{{product.title | fixedLen}}</a> <span class="badge badge-primary" v-if="product.affiliate">Affiliated</span></div>
                    <div>
                        <div class="text-secondary">Last Updated: {{product.updatedAt | timeAgo}}</div>
                    </div>
                </div>
            </div>
        </td>
        <td class="text-center text-capitalize">{{product.seller}}</td>
        <td class="text-center">{{product.fetched_price | moneyFormat}}</td>
        <td class="text-center">{{product.current_price | moneyFormat}}</td>
        <td class="text-right">
            <base-dropdown menu-on-right=""
                tag="div"
                title-classes="btn btn-link btn-icon"
                aria-label="Settings menu"
                >
                <i slot="title" class="tim-icons icon-settings-gear-63"></i>
                <a class="dropdown-item" href="#" @click.prevent="editProduct">{{$t('product.dropdown.edit')}}</a>
                <a class="dropdown-item" href="#" @click.prevent="fetchProduct">{{$t('product.dropdown.fetch')}}</a>
                <a class="dropdown-item" href="#" @click.prevent="deleteProduct">{{$t('product.dropdown.delete')}}</a>
                <a class="dropdown-item" href="#" @click.prevent="userAlert">{{$t('product.dropdown.user_alerts')}}</a>
            </base-dropdown>
        </td>
    </tr>
</template>
<script>
import VueSkeletonLoader from 'skeleton-loader-vue';
export default {
    name: "product-row",
    components: { VueSkeletonLoader },
    props: ['item'],
    data(){
        return {
            product: {},
            isLoading: false
        }
    },
    created(){
        this.product = this.item;
    },
    methods: {
        fetchProduct(e){
            e.preventDefault();
            this.isLoading = true;
            this.$http.post(`/admin/products/${this.product.id}/fetch`)
            .then(res => {
                this.product = res.data.data;
                this.isLoading = false;
                this.$emit('product:update', this.product);
            })
            .catch(() => {
                this.isLoading = false;
            });
        },
        deleteProduct(e){
            e.preventDefault();
            if(confirm('Are you sure to delete this product?')){
                this.$http.delete(`/admin/products/${this.product.id}`)
                .then(res => {
                    if(res.data.status === "success"){
                        this.$emit('product:delete', this.product);
                    }
                })
                .catch(err => {
                    console.log(err.message);
                });
            }
        },
        editProduct(){
            //this.$emit('product:edit', this.product);
            this.$router.push(`/product/${this.product.id}`);
        },
        userAlert(){
            this.$router.push(`/product/${this.product.id}/alerts`);
        }
    }
}
</script>