<template>
  <div class="login">
    <div class="login_box">
      <div>
        <form>
          <div>
            <div class="login_body">
              <h1>Login</h1>
              <ValidationObserver v-slot="{ invalid }" ref="form">
                <form @submit.prevent="login">
                  <ValidationProvider rules="required|email" v-slot="{errors}" name="email">
                    <FormInput type="email" placeholder="Email" label="Email" :show-label="false" v-model="email" :errors="errors"/>
                  </ValidationProvider>

                  <ValidationProvider rules="required" v-slot="{errors}" name="password">
                    <FormInput type="password" placeholder="Password" label="Password" :show-label="false" v-model="password" :errors="errors"/>
                  </ValidationProvider>
                  <div class="form-group">
                    <button class="btn btn-site w-100" :disabled="invalid || pending"> Login </button>
                  </div>
                </form>
              </ValidationObserver>
              <!-- <p>Don't have an account? <router-link to="/signup">Signup Now</router-link></p> -->
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import FormInput from "@/components/form/FormInput"
import { mapActions } from 'vuex'
export default {
  name: "Login",
  components: {
    FormInput,
    ValidationProvider,
    ValidationObserver
  },
  data(){
    return  {
      email: '',
      password: '',
      pending: false,
    }
  },
  methods: {
      ...mapActions({
        setUser: 'setUser'
      }),
      login(){
        /* this.$refs.form.setErrors({
          email: ['This email is already taken']
        }); */
        this.pending = true;
        this.$http.post('/auth/check',  {email: this.email, password: this.password})
        .then(res => {
          this.setUser(res.data.data);
          this.$router.push('/dashboard');
        })
        .catch(err => {
            this.pending = false;
            if(err.response){
              // error in respose
              let response_data = err.response.data;
              let error_type = response_data.status || '';
              let message = response_data.message || '';
              let errors = response_data.data.errors || {};
              if(error_type === 'fail'){
                return this.$toast.error(message);
              }else if(error_type === 'error'){
                this.$refs.form.setErrors(errors);
              }
            }else if(err.request){
              // error in sending request
            }else{
              // javascript error
            }
        });
      }
  }
};
</script>

<style lang="scss" scoped>
.login_body h1 {
    color: #584848;
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 30px;
}
.login_box {
   /*  background: #fff;
    border-radius: 4px;
    box-shadow: 0px 0px 6px rgb(0 0 0 / 10%); */
    max-width: 400px;
    width: 100%;
    text-align: center;
    margin: auto;
    position: absolute;
     top: 10%;
    left: 50%;
    transform: translateX(-50%);
}

.login_body {
    padding: 30px 30px 10px 30px;
}
.logo_box {
    text-align: center;
    padding: 40px 0px 0px 0px;
}

.wifi_img {
    padding: 135px 15px 100px 15px;
    text-align: center;
}
</style>
