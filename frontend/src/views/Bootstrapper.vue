<template>
  <base-layout>
      <router-view></router-view>
  </base-layout>
</template>

<script>
// Bootstrapping Application
import { mapMutations } from 'vuex'
import { mapActions } from 'vuex'
import menus from "@/assets/menu";
export default {
  name: 'Bootstrapper',
  methods: {
      // loading mutations
    ...mapMutations([
        'setMenu'
    ]),

    // loading actions
    ...mapActions([
        'loadDeviceInfo'
    ])
  },
  created(){
        this.setMenu(menus);
        this.loadDeviceInfo();
    }
}
</script>
