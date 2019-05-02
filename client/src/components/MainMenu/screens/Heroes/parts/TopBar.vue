<template>
    <div>
        <div class="heroes__close" @click="goBackToMain()" >X</div>
        <div class="heroes__top">
            <div class="heroes__avatars">
                <div class="heroes__avatars__wrapper">
                    <div
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
                    </div>
                </div>
            </div>
            <div class="heroes__study-button">
                <img src="~img/box.png" alt="">
                <div>Обучение</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TopBar',
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
        persentPowerPersonage(personage) {
            return 100 * personage.power / personage.maxPower;
        },
        changeCurrent(index) {
            this.$emit('changeCurrent', index);
        },
        ...mapMutations('gameInfo', ['changeMenuScreen'])
    }
};
</script>

<style lang="scss" scoped>
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
        height: 90px;
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
        &__item {
            width: 60px;
            margin-right: 25px;
            position: relative;
            cursor: pointer;
            &.--active {
                box-shadow: 0 0 13px #335fff, 0 0 13px #335fff, 0 0 13px #fff;
            }
            &__img {
                border: 4px solid #eee;
                border-radius: 6px;
                overflow: hidden;
                height: 60px;
                box-sizing: border-box;
                position: relative;
                &__lock {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,.7);
                    img {
                        position: absolute;
                        width: 15px;
                        right: 0;
                        top: 0;
                    }
                }
            }
            &__power {
                position: relative;
                bottom: 0;
                left: -4px;
                width: 67px;
                background: linear-gradient(#414240, #717172);
                border-radius: 6px;
                border: 2px solid #a09d98;
                color: #fff;
                font-size: 12px;
                height: 21px;
                display: flex;
                justify-content: center;
                align-items: center;
                &::before {
                    content: "";
                    display: block;
                    position: absolute;
                    left: -14px;
                    top: -2px;
                    width: 30px;
                    height: 30px;
                    background: url(~img/lightning-icon.png) center center no-repeat;
                    background-size: contain;
                    z-index: 10;
                }
                &__text {
                    z-index: 11;
                }
                &__fill {
                    position: absolute;
                    height: 100%;
                    width: 40%;
                    background: #ff7d00;
                    top: 0;
                    left: 0;
                }
            }
        }
    }
}
</style>
