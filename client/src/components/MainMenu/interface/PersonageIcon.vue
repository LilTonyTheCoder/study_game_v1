<template>
    <div
        class="item"
        :class="{'item--can-add' : canAddPers}"
        @click="addPersonage(personage)"
    >
        <div class="item__img">
            <div v-if="!personage.available" class="item__img__lock">
                <img src="~img/lock.png" alt="">
            </div>
            <img :src="require(`img/personages/${personage.avatar}/icon.png`)" alt="" >
            <div class="item__lvl">{{personage.lvl}}</div>
        </div>
        <div v-if="personage.available" class="item__power">
            <div class="item__power__text">{{personage.power}} / {{personage.maxPower}}</div>
            <div class="item__power__fill" :style="{width: 100*personage.power/personage.maxPower+'%'}" ></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PersonageIcon',
    props: {
        personage: {
            type: Object
        },
        canAddPers: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        addPersonage(personage) {
            this.$emit('addPersonage', personage);
        }
    }
}
</script>

<style lang="scss" scoped>
.item {
    width: 60px;
    position: relative;
    cursor: pointer;
    &--can-add {
        &::after {
            display: block;
            content: "+";
            position: absolute;
            left: -7px;
            top: -7px;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: #0fb705;
            display: flex;
            justify-content: center;
            font-weight: bold;
            color: #fff;
            font-size: 36px;
            line-height: 24px;
        }
    }
    &.--active {
        box-shadow: 0 0 13px #335fff, 0 0 13px #335fff, 0 0 13px #fff;
    }
    &__lvl {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #333;
        color: #fff;
        font-weight: bold;
        border-radius: 5px 0 0 0;
        border-top: 1px solid #fff;
        border-left: 1px solid #fff;
    }
    &__img {
        border: 2px solid #eee;
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
</style>

