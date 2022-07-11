<template>
  <div class="sidebar" :class="{ collapsed: is_collapsed }">
    <perfect-scrollbar :options="{ wheelSpeed: 0.3 }" ref="scroll">
      <div class="sidebar-logo text-center pt-2 pb-2">
        <img src="@/assets/logo.png" class="img-fluid" alt="" />
      </div>
      <div class="list-group">
        <router-link
          v-for="(item, index) of menu"
          :key="index"
          :to="item.href"
          v-slot="{ href, navigate, isActive, isExactActive }"
          custom
          class="d-block position-relative main-menu"
        >
          <a
            :href="href"
            class="list-group-item menu-item"
            :class="{ 'router-link-active': isActive }"
            @click="navigate"
            ><span v-html="all_icons[item.icon]" class="sidebar-icon"></span>
            <span class="menu-text">{{ item.title }}</span></a
          >
          <div class="list-group child-menu" :class="{ active: isActive }" v-if="item.child">
            <router-link
              v-for="(child_item, child_index) of item.child"
              :key="child_index"
              :to="child_item.href"
              class="list-group-item"
              :class="{ active: isExactActive }"
              >{{ child_item.title }}</router-link
            >
          </div>
        </router-link>
      </div>
    </perfect-scrollbar>
  </div>
</template>
<script>
import all_icons from "@/assets/svg-icons";
export default {
  name: "SideBar",
  props: ["menu"],
  data() {
    return {
      is_collapsed: false,
      all_icons: all_icons,
    };
  },
  methods: {
    menuToggle() {
      this.is_collapsed = !this.is_collapsed;
      this.$emit("toggle-menu", this.is_collapsed);
    },
  },
};
</script>
<style lang="scss" scoped>
.ps {
  height: 100%;
}
.sidebar {
  width: 17rem;
  background-color: #fff;
  height: 100vh;
  position: fixed;
  left: 0;
  z-index: 100;
  top: 0;
  box-shadow: 0px 1px 10px 1px #edebeb;
  transition: 0.3s width ease;
  //overflow-y: auto;
  &.collapsed {
    overflow-y: visible;
    .ps {
        overflow: visible !important;
    }
    width: 4rem;
    span.menu-text {
      display: none;
    }

    .sidebar-logo {
      img {
        padding: 6px;
      }
    }

    .child-menu {
        display: none !important;
        position: absolute;
        width: 230px;
        font-size: 0.9rem;
        top: 0px;
        left: 4rem;
        border: 1px solid #f7f3f3;
        border-radius: 0;
        .list-group-item {
            background-color: #fff;
            border-left: 5px solid transparent !important;
            &:hover{
                color: #fd6102 !important;
                background-color: #f3f3f3;
                border-left: 5px solid #fd6102 !important;
            }
            &.router-link-exact-active {
                background-color: #3f4c61;
                color: #fff !important;
            }
        }
    }

    .main-menu {
      &:hover {
        .child-menu {
          display: block !important;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.menu-item {
  color: #a4a6a9 !important;
  border: 0 !important;
  border-bottom: 1px solid rgba(243, 243, 243, 1) !important;
  border-right: 0 !important;
  border-left: 5px solid transparent !important;
  border-radius: 0 !important;
  .sidebar-icon {
    margin-right: 1rem;
    svg {
      width: 30px;
      height: auto;
      fill: #a4a6a9;
    }
  }

  &.router-link-active, &:hover {
    color: #fd6102 !important;
    background: rgba(243, 243, 243, 1);
    border-left: 5px solid #fd6102 !important;
    .sidebar-icon {
      svg {
        fill: #fd6102;
      }
    }

    .child-menu {
      display: flex !important;
    }
  }
}

.child-menu {
  display: none !important;
  &.active {
    display: flex !important;
  }
  .list-group-item {
    border: none !important;
    border-radius: 0 !important;
    border-bottom: 1px solid #f3f3f3 !important;
    background-color: #f3f3f3;
    border-left: 5px solid transparent !important;
    &:hover{
        color: #fd6102 !important;
        background: rgba(243, 243, 243, 1);
        border-left: 5px solid #fd6102 !important;
    }
    &.router-link-exact-active {
      border-left: 5px solid #fd6102 !important;
      background-color: #3f4c61 !important;;
      color: white !important;
    }
  }
}
</style>