<template>
    <div class="right-bar">
        <div class="right-bar__wrapper">
            <MenuRightButton :name="`События`" :icon="`rupor.png`" :notification="10" />
            <MenuRightButton :name="`Новости`" />
            <MenuRightButton :name="`Магазин`" :icon="`rupor.png`" />
            <MenuRightButton :name="`Пригласить`" :icon="`rupor.png`" />
            <MenuRightButton :name="`Сообщения`" :icon="`rupor.png`" />
            <MenuRightButton :name="`Настройки`" :icon="`rupor.png`" />
        </div>
    </div>
</template>

<script>
import MenuRightButton from '../global/MenuRightButton.vue';

export default {
    name: 'RightMenu',
    components: {
        MenuRightButton
    },
    props: {},
    computed: {}
};
</script>

<style scoped lang="scss">
.right-bar {
    position: absolute;
    top: 0%;
    right: 0;
    height: 100%;
    width: 65px;
    background: rgba(0,0,0,.3);
    &__wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
</style>
