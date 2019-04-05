<template>
    <div class="item">
        <div class="item__img">
          <img v-if="iconSrc" :src="iconSrc" alt=""> 
        </div>
        <div class="item__text">{{name}}</div>
        <div v-if="notification" class="item__notification">{{notification}}</div>
    </div>
</template>

<script>
export default {
    name: 'MenuRightButton',
    props: {
        name: {
            type: String,
            default: 'Раздел'
        },
        icon: {
          type: String,
          default: ''
        },
        notification: {
          type: Number
        }
    },
    computed: {
      iconSrc() {
        return this.icon ? require(`img/${this.icon}`) : false;
      }
    }
};
</script>

<style scoped lang="scss">
.item {
  width: 50px;
  height: 50px;
  background: radial-gradient(ellipse at center, #3f446c 0%,#76789f 99%);
  margin-top: 10px;
  border-radius: 5px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.8);
  cursor: pointer;
  border: 1px solid #000;
  position: relative;
  transition: 0.3s;
  &:hover {
    background: radial-gradient(ellipse at center, #2C315C 0%,#57597F 99%);
    transform: scale(1.2);
    transform-origin: right center;
  }
  &__img {
    img {
      width: 40px;
    }
  }
  &__text {
    color: #fff;
    font-size: 12px;
    margin-top: -9px;
    text-shadow: 0 0 8px rgba(0, 0, 0, 0.8);
  }
  &__notification {
    position: absolute;
    top: -7px;
    left: -7px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: linear-gradient(-45deg, #821703, #fa7b6a);
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.8);
    color: #fff;
    font-weight: bold;
    border: 1px solid #000;
  }
}
</style>
