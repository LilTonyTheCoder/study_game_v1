<template>
    <div class="main-menu__top">
        <div class="main-menu__top__item main-menu__top__item__gold">
            <div class="main-menu__top__item__count">0</div>
        </div>
        <div class="main-menu__top__item main-menu__top__item__platina">
            <div class="main-menu__top__item__count">0</div>
        </div>
        <div class="main-menu__top__item main-menu__top__item__power">
            <div class="main-menu__top__item__dots">
                <div class="main-menu__top__item__one-dot --active"></div>
                <div class="main-menu__top__item__one-dot --active"></div>
                <div class="main-menu__top__item__one-dot --active"></div>
                <div class="main-menu__top__item__one-dot --active"></div>
                <div class="main-menu__top__item__one-dot --active"></div>
                <div class="main-menu__top__item__one-dot --active"></div>
                <div class="main-menu__top__item__one-dot --active"></div>
                <div class="main-menu__top__item__one-dot --active"></div>
                <div class="main-menu__top__item__one-dot"></div>
                <div class="main-menu__top__item__one-dot"></div>
            </div>
            <div class="main-menu__top__item__count">MAX</div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Header',
    data() {
        return {};
    },
    computed: {},
    methods: {}
};
</script>

<style lang="scss">
  .main-menu {
    &__top {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 35px;
    // background: #eee;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    z-index: 10;
    &__item {
      width: 20%;
      height: 70%;
      background: linear-gradient(#030303,#333);
      margin: 0 1%;
      border: 2px solid #faf5f9;
      border-radius: 10px;
      cursor: pointer;
      color: #fff;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      cursor: pointer;
      &__dots {
        position: absolute;
        right: 35%;
        width: 45%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        padding: 3px;
        box-sizing: border-box;
        justify-content: center;
        align-items: center;
        max-width: 80px;
      }
      &__one-dot {
        width: 14%;
        height: 8px;
        margin-right: 2px;
        border-radius: 50%;
        // background: red;
        box-shadow: 0 0 4px rgba(255, 255, 255, 0.7);
        &.--active {
            background: #7ce6f4;
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
        }
      }
      &::after {
        display: block;
        content: "";
        height: 170%;
        width: 35%;
        position: absolute;
        left: -10%;
        top: -30%;
        // background: url(../assets/img/gold-bar.png) center center no-repeat;
        background-size: contain;
      }
      &__power {
        .main-menu__top__item__count {
          position: absolute;
          color: #10f1ed;
          right: 4%;
        }
      }
      &__gold::after {
        // background-image: url(../assets/img/gold-bar.png);
      }
      &__platina::after {
        // background-image: url(../assets/img/platina-bar.png);
      }
      &__power::after {
        // background-image: url(../assets/img/fist.png);
      }
    }
  }
  }
</style>
