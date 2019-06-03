<template>
    <div
        class="personage"
        :class="generatePersClass(personage)"
        @click="target(personage.id)"
    >
        <div class="personage__wrapper">
            <div
                v-if="personage.damagedNumAnimation"
                class="damage-num"
            >-{{personage.currentDamage}}</div>
            <!-- анимация скилла атакующего -->
            <div
                v-if="personage.isNowDoingHit"
                :class="[`doing-skill__${personage.animationName}`]"
            ></div>
            <!-- анимация повреждения от атакующего -->
            <div
                v-if="personage.damagedAnimation"
                :class="[`damage-from-skill`]"
            ></div>

            <div class="personage__icon">
                <img
                    :src="require(`img/${personage.img}`)"
                    :class="generateDamageAnimation(personage)"
                >
            </div>
            <div class="personage__top-info">
                <div
                    v-for="line in personageLines"
                    :key="line"
                    :class="[`personage__${line}`]"
                >
                    <div
                        class="fill"
                        :style="`width: ${generateFillWidth(line)}%;`"
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
    data() {
        return {
            personageLines: ['hp', 'mana', 'power']
        };
    },
    methods: {
        generatePersClass(personage) {
            let type = personage.type === 'enemy' ? 'enemy' : 'personage';

            if (personage.position === 'center') return `${type}--center`;
            if (personage.position === 'nearbyenemy') return `${type}--nearbyenemy-${personage.enemy.index + 1}`;

            return `${type}--default-${personage.index + 1}`;
        },
        target(id) {
            this.$emit('attack', id);
        },
        generateFillWidth(paramName) {
            const { personage } = this;

            if (paramName === 'hp') return (personage.hp / personage.maxHP) * 100;
            if (paramName === 'mana') return (personage.mana / personage.maxMana) * 100;
            if (paramName === 'power') return (personage.power / personage.maxPower) * 100;

            return 100;
        },
        generateDamageAnimation(personage) {
            if (personage.type === 'team') {
                return { 'personage__damaged--reverse': personage.damagedAnimation };
            }
            return { 'personage__damaged': personage.damagedAnimation };
            // return {'personage__damaged' : true};
        }
    }
};
</script>
<style lang="scss" scoped>

.personage {
  // width: 150px;
  // height: 180px;
  width: 240px;
  height: 250px;
  position: absolute;
  bottom: 0;
  cursor: pointer;
  transition: .3s;
  &__wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }
  &__icon {
    position: absolute;
    top: 30px;
    width: 150px;
    animation-name: pulse;
    animation-duration: .8s;
    animation-iteration-count: infinite;
    transform-origin: bottom;
    img {
      width: 100%;
    }
  }
  &__damaged {
      filter: brightness(100);
      transform: rotate(15deg);
      &::after {
          display: block;
          content: '';
          width: 50px;
          height: 50px;
          background: red;
          position: absolute;
          left: 0;
          top: 0;
      }
      &--reverse {
        filter: brightness(100);
        transform: rotate(-15deg);
      }
  }
  &__top-info {
    width: 90px;
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
  &--center {
    left: 45%;
    bottom: 0;
  }
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
.damage-num {
  color: #fff;
  font-size: 42px;
  font-weight: bold;
  position: absolute;
  top: 10px;
  left: 40px;
  z-index: 10;
  text-shadow: 0px 0px 8px #000;
  transition: .3s;
  animation-name: damage-num;
  animation-duration: 1.2s;
  animation-fill-mode: forwards
//   animation-iteration-count: infinite;
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
@keyframes damage-num {
    0% {opacity: 0;transform: scale(4);}
    20% {opacity: 1;transform: scale(1);}
    100% {opacity: 0; transform: translateY(-30px)}
}
</style>

<style lang="scss" scoped>
.damage-from-skill {
    position: relative;
    width: 120px;
    height: 120px;
    left: 20px;
    top: 20px;
    background: url('~img/skills-animation/damage/hit.png') no-repeat;
    background-size: contain;
    z-index: 9;
    animation-name: damage;
    animation-duration: .3s;
    opacity: 0.6;
    transform-origin: center center;
}
.doing-skill {
  &__amazonia-hit {
    position: relative;
    width: 100%;
    height: 170px;
    left: 20px;
    background: url("~img/skills-animation/amazonia-skills.png") no-repeat;
    background-size: contain;
    z-index: 9;
    &::after {
      position: absolute;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      content: '';
      display: block;
      background: #fff;
      left: 86px;
      top: 66px;
    }
    animation-name: amazonia-hit;
    animation-duration: .8s;
    transform-origin: center center;
  }
}

@keyframes amazonia-hit {
    0%  {transform: scale(0.5);}
    100% {transform: scale(1);}
}
@keyframes damage {
    0%  {transform: scale(0.8);}
    100% {transform: scale(1);}
}
</style>
