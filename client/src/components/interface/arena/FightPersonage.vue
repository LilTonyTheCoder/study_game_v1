<template>
    <div class="personage" :class="generatePersClass(personage)" @click="target(personage.id)">
        <div class="personage__wrapper">
            <div class="personage__icon">
                <img :src="require(`img/${personage.img}`)" alt="">
            </div>
            <div class="personage__top-info">
                <div class="personage__hp">
                    <div
                        class="fill"
                        :style="`width: ${(personage.hp/personage.maxHP)*100}%;`"
                    ></div>
                </div>
                <div class="personage__mana">
                    <div
                        class="fill"
                        :style="`width: ${(personage.mana/personage.maxMana)*100}%;`"
                    ></div>
                </div>
                <div class="personage__power">
                    <div
                        class="fill"
                        :style="`width: ${(personage.power/personage.maxPower)*100}%;`"
                    ></div>
                </div>
            </div>
            <div class="personage__lvl">{{personage.lvl}}</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'FightPersonage',
    props: {
        personage: {
            type: Object
        }
    },
    methods: {
        generatePersClass(personage) {
            let type = personage.type === 'enemy' ? 'enemy' : 'personage';

            if (personage.position === 'center') return 'personage--center';
            if (personage.position === 'nearbyenemy') return `${type}--nearbyenemy-${personage.enemy.index + 1}`;

		  return `${type}--default-${personage.index + 1}`;
        },
        target(id) {
            this.$emit('attack', id);
        }
    }
};
</script>
<style lang="scss" scoped>

.personage {
  width: 150px;
  height: 180px;
  position: absolute;
  bottom: 0;
  cursor: pointer;
  transition: .3s;
  &__wrapper {
    position: relative;
  }
  &__icon {
    position: absolute;
    top: 30px;
    width: 100%;
    animation-name: pulse;
    animation-duration: .8s;
    animation-iteration-count: infinite;
    transform-origin: bottom;
    img {
      width: 100%;
    }
  }
  &__top-info {
    width: 60%;
    height: 21px;
    background: #eee;
    position: absolute;
    top: 4px;
    left: 25%;
    display: flex;
    flex-direction: column;
    border: 1px solid #000;
    border-radius: 6px;
    overflow: hidden;
  }
  &__lvl {
    position: absolute;
    top: 0px;
    left: 15px;
    width: 26px;
    height: 26px;
    background: #1720A8;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-weight: bold;
    border: 2px solid #000;
  }
  &__hp {
    width: 100%;
    height: 7px;
    border-bottom: 1px solid #000;
    position: relative;
    .fill {
      position: absolute;
      background: #00D200;
      width: 80%;
      height: 100%;
    }
  }
  &__mana {
    width: 100%;
    height: 7px;
    border-bottom: 1px solid #000;
    position: relative;
    .fill {
      position: absolute;
      background: #008CD2;
      width: 30%;
      height: 100%;
    }
  }
  &__power {
    width: 100%;
    height: 7px;
    position: relative;
    .fill {
      position: absolute;
      background: #F4A70E;
      width: 20%;
      height: 100%;
    }
  }
}
.personage {
  &--default-1 {
    left: 17%;
    bottom: 0%;
    z-index: 1;
  }
  &--default-2 {
    left: 4%;
    bottom: 10%;
    z-index: 1;
  }
  &--center {
    left: 35%;
    bottom: 0;
  }
  &--nearbyenemy-1 {
      left: 43%;
      bottom: 0;
      z-index: 10;
  }
  &--nearbyenemy-2 {
      left: 62%;
      bottom: 10%;
      z-index: 10;
  }
  &.punch {
      animation-name: punch;
      animation-duration: .8s;
  }
}
.enemy {
  &--default-1 {
      left: 57%;
      bottom: 0;
      z-index: 1;
  }
  &--default-2 {
      left: 77%;
      bottom: 10%;
      z-index: 1;
  }
  &--nearbyenemy-1 {
      left: 32%;
      bottom: 0;
      z-index: 10;
  }
  &--nearbyenemy-2 {
      left: 18%;
      bottom: 10%;
      z-index: 10;
  }
  &.punch {
      animation-name: punchReverse;
      animation-duration: .8s;
  }
}
.death {
      opacity: 0;
      cursor: default;
}

@keyframes pulse {
    0%  {transform: scaleY(1);}
    50% {transform: scaleY(0.95);}
    100% {transform: scaleY(1);}
}
@keyframes punch {
    0%  {transform: rotate(0deg);}
    50% {transform: rotate(10deg);}
    100% {transform: rotate(0deg);}
}
@keyframes punchReverse {
    0%  {transform: rotate(0deg);}
    50% {transform: rotate(-10deg);}
    100% {transform: rotate(0deg);}
}
@keyframes death {
    0%  {opacity: 1;}
    100% {opacity: 0;}
}
</style>
