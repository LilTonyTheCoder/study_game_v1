<template>
    <div id="app" class="app">
        <div class="app__inner">
            <Loading v-if="isLoading" :message="loadingMessage" />
            <MainMenu v-if="currentLocation === 'menu'" />
            <Arena v-if="currentLocation === 'arena'" />
        </div>
    </div>
</template>

<script>
import Loading from './components/Loading.vue';
import DataService from './DataService';

import MainMenu from './components/MainMenu.vue';
import Arena from './components/Arena.vue';

export default {
    name: 'app',
    components: {
        Loading,
        MainMenu,
        Arena
    },
    data() {
        return {
            loadingMessage: ''
        };
    },
    computed: {
        ...mapState({
            isLoading: state => state.gameInfo.isLoading,
            currentLocation: state => state.gameInfo.currentLocation
        }),
        ...mapMutations('gameInfo', ['stopLoading'])
    },
    methods: {
        async loadServerData() {
            try {
                this.loadingMessage = await DataService.getData();
                console.dir(this.loadingMessage); // TODO: записывать данные во vuex
                this.loadData(this.loadingMessage);
                this.stopLoading();
            } catch (err) {
                this.loadingMessage = err.message;
            }
        },
        ...mapMutations('data', ['loadData'])
    },
    created() {
        setTimeout(() => { this.loadServerData(); }, 10); // загрузка данных
    }
};
</script>

<style lang="scss" scoped>
.app {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
  &__inner {
    width: 1024px;
    height: 768px;
    border-radius: 5px;
    box-shadow: 0 0 20px 4px rgba(0, 0, 0, 0.2);
    position: relative;
  }
}
</style>
