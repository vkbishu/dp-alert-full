<template>
    <div class="setting">
        <div class="row">
            <div class="col-sm-8">
                <card>
                    <template #header>
                        <h4 class="title">Setting</h4>
                    </template>
                    <div>
                        <h5>Enable Proxy</h5>
                        <base-radio :inline="true" v-model="setting.enable_proxy" value="yes" name="yes"> Yes</base-radio>
                        <base-radio :inline="true" v-model="setting.enable_proxy" value="no" name="no"> No</base-radio>
                    </div>
                    <div class="proxy-list  mt-3" v-if="setting.enable_proxy === 'yes'">
                        <table class="table">
                            <tbody>
                                <tr v-for="item in proxy_list" :key="item.id" :class="{'bg-danger':setting.proxy_api_id == item.id}">
                                    <td>
                                        <div class="d-flex align-items-center mb-3">
                                            <h6 class="m-0 mr-3">{{item.name}}</h6>
                                            <div><span class="badge badge-info">M: {{item.count_month}}</span> <span class="badge badge-info">T: {{item.count_total}}</span></div>
                                        </div>
                                        
                                        <div>{{item.url}}</div>
                                    </td>
                                    <td class="text-right">
                                        <button class="btn btn-sm btn-info mb-2" :disabled="setting.proxy_api_id == item.id" @click.prevent="setProxy(item)">Select</button>
                                        <button class="btn btn-sm btn-info" @click.prevent="deleteProxy(item)">Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <button class="btn btn-primary mt-3" @click.prevent="updateSetting">Save</button>
                </card>
            </div>
            <div class="col-sm-4">
                <card>
                    <template #header>
                        <h4 class="title">Add Proxy API</h4>
                    </template>
                    <base-input
                    label="API Name"
                    v-model="proxy.name"
                    placeholder="Ex. ScrapperAPI"
                    ></base-input>
                    <base-input
                    label="Base URL"
                    placeholder="URL.."
                    v-model="proxy.url"
                    ></base-input>
                    
                    <base-button class="btn btn-primary" @click.prevent="addProxy">Save</base-button>
                </card>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Setting",
    data(){
        return {
            proxy_list: [],
            setting: {
                enable_proxy: "yes", // default value
                proxy_api_id: 0 // default value
            },
            proxy: {
                url: '',
                name: '',
            }
        }
    },
    created(){
        this.getSetting();
        this.getProxyList();
    },
    methods: {
        getSetting(){
            this.$http.get('/admin/settings')
            .then(res => {
                if(res.data.status === 'success'){
                    this.setting.enable_proxy = res.data.data.enable_proxy || this.setting.enable_proxy;
                    this.setting.proxy_api_id = res.data.data.proxy_api_id || this.setting.proxy_api_id;
                }
            });
        },
        updateSetting(){
            this.$http.post('/admin/settings', this.setting)
            .then(res => {
                if(res.data.status === 'success'){
                    this.$notify({
                        message: 'Setting updated',
                        icon: "tim-icons icon-bell-55",
                        horizontalAlign: 'center',
                        verticalAlign: 'top',
                        type: 'success',
                        timeout: 3000 // 3 seconds
                    });
                }
            });
        },
        setProxy(item){
            this.setting.proxy_api_id = item.id;
        },
        deleteProxy(item){
            if(item.id === this.setting.proxy_api_id){
                alert('This proxy is in use.');
                return;
            }
            if(confirm('Are you sure to delete this record?')){
                    this.$http.delete('/admin/settings/proxy_api/'+item.id)
                    .then(res => {
                        if(res.data.status == 'success'){
                            this.getProxyList();
                        }
                    });
            }
        },
        addProxy(){
            this.$http.post('/admin/settings/proxy_api', this.proxy)
            .then(res => {
                if(res.data.status === 'success'){
                    this.proxy = {
                        url: '',
                        name: '',
                    };
                    this.getProxyList();
                }
            });
        },
        getProxyList(){
            this.$http.get('/admin/settings/proxy_api')
            .then(res => {
                if(res.data.status === 'success'){
                    this.proxy_list = res.data.data;
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>

</style>