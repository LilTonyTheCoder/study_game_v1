<template>
    <div id="app" class="app">
        <div class="app__inner">
            <Loading v-if="isLoading" :message="loadingMessage" />
            <component :is="currentLocation" />
        </div>
    </div>
</template>

<script>
import DataService from './DataService';
import * as components from './components';

export default {
    name: 'app',
    components: {
        ...components
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
    created() {
        setTimeout(() => { this.loadServerData(); }, 10); // загрузка данных
    },
    methods: {
        async loadServerData() {
            try {
                this.loadingMessage = await DataService.getData();
                this.loadData(this.loadingMessage);
                this.stopLoading();
            } catch (err) {
                this.loadingMessage = err.message;
            }
        },
        ...mapMutations('data', ['loadData'])
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
