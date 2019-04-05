<template>
  <div class="main-menu std-block bg-image">
    <Header></Header>

    <LeftMenu />
    <RightMenu />

    <MenuMainList v-if="currentMenuScreen === 'MenuMainList'" />
    <MissionPopup v-if="currentMenuScreen === 'MissionPopup'" />

  </div>
</template>

<script>

import Header from "./interface/Header.vue";
import RightMenu from "./interface/RightMenu.vue"
import LeftMenu from "./interface/LeftMenu.vue";
import MenuMainList from "./interface/MenuMainList.vue";
import MissionPopup from "./interface/MissionPopup.vue";

export default {
  name: 'MainMenu',
  components: {
    Header,
    RightMenu,
    LeftMenu,
    MenuMainList,
    MissionPopup
  },
  data() {
    return {
      // currentMenuScreen: 'MenuMainList'
    }
  },
  computed: {
    ...mapState({
      currentMenuScreen: state => state.gameInfo.currentMenuScreen
    })
  }
}
</script>

<style lang="scss">

.main-menu {}
</style>
