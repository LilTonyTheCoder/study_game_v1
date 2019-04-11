<template>
    <div class="content">
        <MenuSection :name="`Герои`" />
        <MenuSection :name="`Миссии`" />
        <MenuSection :name="`Задания`" :disable="true" />
        <MenuSection :name="`PvP`" :disable="true" />
        <MenuSection :name="`Подземелья`" :disable="true" />
        <MenuSection :name="`Амуниция`" :disable="true" />
        <MenuSection :name="`Игрок`" :disable="true" />
    </div>
</template>

<script>
import MenuSection from '../interface/MenuSection.vue';

export default {
    name: 'MenuMainList',
    components: {
        MenuSection
    },
    props: {},
    computed: {

    },
    methods: {}
};
</script>

<style scoped lang="scss">
$barWidth: 65px;

.content {
  position: absolute;
  top: 35px;
  left: $barWidth;
  height: calc(100% - 35px);
  max-height: 250px;
  width: calc(100% - #{$barWidth} - #{$barWidth});
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
</style>
