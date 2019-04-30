<template>
    <div class="main-menu std-block bg-image">
        <Header></Header>

        <LeftMenu />
        <RightMenu />

        <component :is="currentMenuScreen" />
    </div>
</template>

<script>

import Header from '../global/interface/Header.vue';
import * as interfaces from './interface';
import * as screens from './screens';

export default {
    name: 'MainMenu',
    components: {
        Header,
        ...interfaces,
        ...screens
    },
    data() {
        return {
            // currentMenuScreen: 'MainList'
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
