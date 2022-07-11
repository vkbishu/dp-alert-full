<template>
    <div class="mt-4 container">
         <div class="banner text-white">
                <div class="row">
                    <div class="col-sm-7">
                        <h1 class="mb-4 text-uppercase fw-bold">{{title}}</h1>
                        <h4 class="mb-4" style="font-weight: normal">{{subtitle}}</h4>
                        <div v-if="!email_sent">
                            <div class="signup-wrapper">
                                <input type="text" class="form-control form-control-lg rounded-pill" placeholder="Enter your email..." v-model="email">
                                <button class="btn btn-primary btn-min-w rounded-pill" @click.prevent="sendSigupLink">Signup Now</button>
                            </div>
                        </div>
                        <div class="alert alert-success" v-else>
                            <h4>Thank you for joining us!</h4>
                           A signup link has been sent to your email ID. Please check your email.
                        </div>
                    </div>
                    <div class="col-sm-5">
                        <div class="position-relative banner-image">
                            <img src="@/assets/banner-image-sm.png" alt="">
                        </div>
                    </div>
                </div>
            </div>
    </div>
</template>

<script>
import { validate } from 'vee-validate';
export default {
    name: "Banner",
    data(){
        return {
            email_sent: false,
            email: '',
        }
    },
    props: {
        title: String,
        subtitle: String
    },
    methods: {
        sendSigupLink(){
            if(this.email.trim().length === 0){
                return false;
            }
            validate(this.email, 'email')
            .then(result => {
                if(result.valid){
                    this.$http.post('/auth/send-signup-link', {email: this.email})
                    .then(() => {
                        this.email_sent = true;
                        this.email = '';
                    })
                    .catch((err) => {
                        if(err.response){
                            // error in respose
                            let response_data = err.response.data;
                            let error_type = response_data.status || '';
                            let message = response_data.message || '';
                            let errors = response_data.data.errors || {};
                            if(error_type === 'fail'){
                                return this.$toast.error(message);
                            }else if(error_type === 'error'){
                                return this.$toast.error(errors.email[0]);
                            }
                        }else if(err.request){
                        // error in sending request
                        }else{
                        // javascript error
                        }
                    });
                }else{
                   return this.$toast.error('Please enter a valid email');
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.banner-image {
    img {
        position: absolute;
        top: -60px;
        max-width: 100%;
    }
}
.signup-wrapper{
    position: relative;
    .form-control {
        padding-right: 135px;
    }
    .btn {
        position: absolute;
        right: 4px;
        top: 5px;
    }
}
.banner {
    padding: 6rem 3rem;
    background: rgb(247,128,128);
    background: linear-gradient(65deg, rgba(247,128,128,1) 0%, rgba(255,62,91,1) 51%, rgba(255,26,64,1) 89%);
    border-radius: 30px;
}
@media (max-width: 575.98px) { 
    .banner {
        text-align: center;
        background: linear-gradient(6deg, rgba(247,128,128,1) 0%, rgba(255,62,91,1) 51%, rgba(255,26,64,1) 89%);
    }

    .signup-wrapper{
        margin-left: -25px;
        margin-right: -25px;
    }
}
</style>