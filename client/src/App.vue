<template>
    <div id="app" class="app">
        <div class="app__inner">
          <Loading :message="loadingMessage" v-if="isLoading" />
          <MainMenu />
        </div>
    </div>
</template>

<script>
import Loading from './components/Loading.vue';
import DataService from './DataService';

import MainMenu from './components/MainMenu.vue';

export default {
    name: 'app',
    data() {
      return {
        loadingMessage: ''
      }
    },
    components: {
        Loading,
        MainMenu
    },
    computed: {
        ...mapState({
            isLoading: state => state.gameInfo.isLoading
        }),
        ...mapMutations('gameInfo', ['stopLoading'])
    },
    methods: {
      async loadServerData() {
        try {
          this.loadingMessage = await DataService.getData();
          this.stopLoading();
        } catch(err) {
          this.loadingMessage = err.message;
        }
      }
    },
    created() {
        setTimeout(()=>{this.loadServerData();}, 500) // загрузка данных
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
