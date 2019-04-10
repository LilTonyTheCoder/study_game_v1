<template>
    <div class="left-bar">
        <div class="left-bar__wrapper">

            <div class="left-bar__item">
                <div class="left-bar__img">
                    <img src="~img/fist.png" alt="">
                </div>
                <div class="left-bar__text">
                    1:51:34
                </div>
            </div>

            <div class="left-bar__item">
                <div class="left-bar__img">
                    <img src="~img/dragon.png" alt="">
                </div>
                <div class="left-bar__text">
                    0 / 5
                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: 'LeftMenu',
    components: {},
    props: {},
    computed: {}
};
</script>

<style scoped lang="scss">
$barWidth: 65px;
.left-bar {
  position: absolute;
  top: 0;
  left: 0;
  height: 80%;
  width: $barWidth;
  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100%;
    justify-content: center;
  }
  &__item {
    width: calc( #{$barWidth} - 15px );
    height: calc( #{$barWidth} - 15px );
    background: linear-gradient(#333, #4D4D4D);
    margin-top: 25px;
    border: 2px solid #eee;
    border-radius: 5px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.8);
    cursor: pointer;
    position: relative;
    transition: 0.3s;
    &:hover {
      background: radial-gradient(ellipse at center, #2C315C 0%,#57597F 99%);
      transform: scale(1.2);
      transform-origin: left center;
      z-index:10;
    }
  }
  &__img {
    img {
      width: 100%;
      height: 100%;
    }
  }
  &__text {
    color: #fff;
    text-shadow: 2px 0 0 #000, -2px 0 0 #000, 0 2px 0 #000, 0 -2px 0 #000, 1px 1px #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000;
    font-weight: bold;
  }
}
</style>
