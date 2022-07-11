<template>
<home-layout>
  <div class="home">
    <section>
      <Banner title="Drop Price Alert" subtitle="Shop with your favorite online store like Flipcart & Amazon at a price you want."/>
    </section>
    <section class="section-step">
      <div class="container">
        <div class="ps-4 pe-4">
          <div class="row">
            <div class="col-sm-4">
              <div class="card step shadow-lg">
                  <div class="d-flex align-items-center">
                    <div class="icon icon-search"></div>
                    <div class="label">Find Your Product</div>
                  </div>
              </div>
            </div>
            <div class="col-sm-4">
              <div class="card step shadow-lg">
                 <div class="d-flex align-items-center">
                    <div class="icon icon-alert"></div>
                    <div class="label">Set Price Alert</div>
                  </div>
              </div>
            </div>
            <div class="col-sm-4">
              <div class="card step shadow-lg">
                 <div class="d-flex align-items-center">
                    <div class="icon icon-notification"></div>
                    <div class="label">Get Notification</div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="mb-5">
      <div class="container ps-5 pe-5 text-center">
        <h3 class="text-center">About Us</h3>
        <p><b>DropPriceAlert</b> is an online platform where you can set your own price for products you want to purchase from your favorite online store like Amazon & Flipcart. Whenever the price is dropped to your set price, you'll get notification via email and phone. But First, you need to register. After that, you can see all your set price in your dashboard.</p>
      </div>
    </section>
  </div>
</home-layout>
</template>

<script>
// @ is an alias to /src
import Banner from '@/components/Banner.vue'

export default {
  name: 'Home',
  components: {
    Banner
  }
}
</script>

<style lang="scss" scoped>
.step {
  padding: 2rem;
    border-radius: 20px;
    border: none;
    margin-bottom: 1rem;
    //background-color: #a9a2a2;

    .icon {
      flex-grow: 0;
      flex-shrink: 0;
      width: 50px;
      height: 50px;
      //background-color: #ddd;
      border-radius: 50%;
      margin-right: 0.8rem;
      background-repeat: no-repeat;
      background-size: 100%;
    }

    .icon-search {
      background-image: url('../assets/icons/icon-search.png');
    }

    .icon-alert {
      background-image: url('../assets/icons/icon-alert.png');
    }

    .icon-notification {
      background-image: url('../assets/icons/icon-notification.png');
    }

    .label {
      font-weight: bold;
      color: #8d8d8d;
    }
}

.section-step {
  position: relative;
  top: -4rem;
}
</style>