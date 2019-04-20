<template>
    <div class="main-menu std-block bg-image">
        <Header></Header>

        <LeftMenu />
        <RightMenu />

        <MenuMainList v-if="currentMenuScreen === 'MenuMainList'" />
        <MissionPopup v-if="currentMenuScreen === 'MissionPopup'" />
        <Heroes v-if="currentMenuScreen === 'Heroes'" />

    </div>
</template>

<script>

import Header from './global/interface/Header.vue';
import RightMenu from './MainMenu/interface/RightMenu.vue';
import LeftMenu from './MainMenu/interface/LeftMenu.vue';
import MenuMainList from './MainMenu/MenuOption/MenuMainList.vue';
import MissionPopup from './MainMenu/MenuOption/MissionPopup.vue';
import Heroes from './MainMenu/MenuOption/Heroes.vue';

export default {
    name: 'MainMenu',
    components: {
        Header,
        RightMenu,
        LeftMenu,
        MenuMainList,
        MissionPopup,
        Heroes
    },
    data() {
        return {
            // currentMenuScreen: 'MenuMainList'
        };
    },
    computed: {
        ...mapState({
            currentMenuScreen: state => state.gameInfo.currentMenuScreen
        })
    }
};
</script>

<style lang="scss">

.main-menu {}
</style>
