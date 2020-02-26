<template>
    <div>
        <div class="heroes__close" @click="goBackToMain()" >X</div>
        <div class="heroes__top">
            <div class="heroes__avatars">
                <div class="heroes__avatars__wrapper">
                    <div
                        v-for="(personage, index) in getPersonages"
                        :key="index"
                        class="personage_block"
                        @click="changeCurrent(index)"
                    >
                        <PersonageIcon
                            :personage="personage"
                            :isActive="currentActive===index"
                        />
                    </div>
                    <!-- <div
                        v-for="(personage, index) in getPersonages"
                        :key="index"
                        class="heroes__avatars__item"
                        :class="{'--active' : currentActive === index}"
                        @click="changeCurrent(index)"
                    >
                        <div class="heroes__avatars__item__img">
                            <div v-if="!personage.available" class="heroes__avatars__item__img__lock">
                                <img src="~img/lock.png" alt="">
                            </div>
                            <img :src="require(`img/personages/${personage.avatar}/icon.png`)" alt="">
                        </div>
                        <div class="heroes__avatars__item__power">
                            <div class="heroes__avatars__item__power__text">{{personage.power}} / {{personage.maxPower}}</div>
                            <div class="heroes__avatars__item__power__fill" :style="{width: persentPowerPersonage(personage)+'%'}"></div>
                        </div>
                    </div> -->
                </div>
            </div>
            <div class="heroes__study-button" @click="goToLearningCompo()">
                <img src="~img/box.png" alt="">
                <div>Обучение</div>
            </div>
        </div>
    </div>
</template>

<script>
import PersonageIcon from '../../../interface/PersonageIcon';

export default {
    name: 'TopBar',
    components: {
        PersonageIcon
    },
    props: {
        currentActive: {
            type: Number
        }
    },
    computed: {
        ...mapGetters('data', ['getPersonages'])
    },
    methods: {
        goBackToMain() {
            this.changeMenuScreen('MainList');
        },
        changeCurrent(index) {
            this.$emit('changeCurrent', index);
        },
        goToLearningCompo() {
            this.changeMenuScreen('LearningCompo');
        },
        ...mapMutations('gameInfo', ['changeMenuScreen'])
    }
};
</script>

<style lang="scss" scoped>
.personage_block {
    margin-right: 30px;
}
.heroes {
    &__close {
        position: absolute;
        width: 50px;
        height: 50px;
        content: "X";
        top: -25px;
        right: -15px;
        background: #5d6088;
        z-index: 9;
        border-radius: 50%;
        cursor: pointer;
        font-size: 30px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
    }
    &__top {
        height: 120px;
        display: flex;
    }
    &__study-button {
        width: 20%;
        background: #000;
        border-radius: 6px;
        border: 1px solid #eee;
        color: #fff;
        font-weight: bold;
        box-sizing: border-box;
        padding: 10px 0;
        cursor: pointer;
        img {
            width: 50px;
        }
    }
    &__avatars {
        width: 79%;
        margin-right: 1%;
        background: #000;
        border: 1px solid #eee;
        border-radius: 6px;
        overflow: hidden;
        &__wrapper {
            overflow: auto;
            overflow-y: hidden;
            display: flex;
            padding: 3px 10px;
            height: 100%;
            box-sizing: border-box;
        }
    }
}
</style>
