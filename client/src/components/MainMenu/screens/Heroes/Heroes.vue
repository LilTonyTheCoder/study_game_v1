<template>

    <div class="heroes__popup">
        <TopBar
            :currentActive="currentActive"
            @changeCurrent='currentActive = $event'
        />
        <div class="heroes__bottom">
            <AvatarAndSkills :currentPersonage="currentPersonage" />
            <PersonageStats :currentPersonage="currentPersonage" />
        </div>
    </div>

</template>

<script>
import TopBar from './parts/TopBar.vue';
import AvatarAndSkills from './parts/AvatarAndSkills.vue';
import PersonageStats from './parts/PersonageStats.vue';

export default {
    name: 'Heroes',
    components: {
        TopBar,
        AvatarAndSkills,
        PersonageStats
    },
    data() {
        return {
            currentActive: 0
        };
    },
    computed: {
        currentPersonage() {
            return this.getPersonages[this.currentActive];
        },
        ...mapGetters('data', ['getPersonages'])
    },
    methods: {
        ...mapMutations('gameInfo', ['changeMenuScreen'])
    }
};
</script>

<style lang="scss">
.heroes {
    &__popup {
        position: relative;
        top: 10px;
        width: 85%;
        left: 7%;
        height: calc(100% - 50px);
        background: #000000c7;
        display: flex;
        flex-direction: column;
        border-radius: 6px;
    }
    &__bottom {
        height: 700px;
        display: flex;
    }
}
</style>
