<template>
    <div class="login">
        <card>
            <template #header>
                <h5 class="title text-center text-uppercase">Login</h5>
            </template>
                <base-input
                label="Username"
                type="text"
                placeholder="Username"
                v-model="form.username"
                ></base-input>
                <base-input
                label="Password"
                type="password"
                placeholder="Password"
                v-model="form.password"
                ></base-input>
                <base-button class="mr-2" slot="footer" type="primary" fill @click.prevent="login" :disabled="loading"><span v-if="loading">Loading...</span><span v-else>Login</span></base-button>
        </card>
    </div>
</template>

<script>
import authService from "@/service/auth-service"
export default {
    name: "Login",
    data(){
        return {
            loading: false,
           form: {
            username: '',
            password: ''
           }
        }
    },
    methods: {
        login(){
            this.loading = true;
            this.$http.post('/admin/auth_check', this.form)
            .then(res => {
                this.loading = false;
                if(res.data.status === 'success'){
                    authService.logUser(res.data.data);
                    this.$router.push('/dashboard');
                }
            })
            .catch(err => {
                this.loading = false;
                if(err.response){
                    let data = err.response.data;
                    this.$notify({
                        message: data.message,
                        icon: "tim-icons icon-bell-55",
                        horizontalAlign: 'center',
                        verticalAlign: 'top',
                        type: 'danger',
                        timeout: 3000 // 3 seconds
                    });
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.login {
    width: 100%;
    max-width: 400px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
</style>