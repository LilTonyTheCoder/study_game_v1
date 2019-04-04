<template>
  <div class="main-menu std-block bg-image">
    <Header></Header>

    <LeftMenu />
    <RightMenu />

    <MenuMainList v-if="currentMenuScreen === 'MenuMainList'" />

  </div>
</template>

<script>

import Header from "./interface/Header.vue";
import RightMenu from "./interface/RightMenu.vue"
import LeftMenu from "./interface/LeftMenu.vue";
import MenuMainList from "./interface/MenuMainList.vue";

export default {
  name: 'MainMenu',
  components: {
    Header,
    RightMenu,
    LeftMenu,
    MenuMainList
  },
  data() {
    return {
      currentMenuScreen: 'MenuMainList'
    }
  }
}
</script>

<style lang="scss">

.main-menu {}
</style>
