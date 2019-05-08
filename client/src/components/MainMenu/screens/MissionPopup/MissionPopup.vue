<template>
    <transition name="slide">
        <div>
            <div class="mission-popup">
                <div class="mission-popup__wrapper">
                    <MissionsTitle />

                    <div class="mission-popup__content">
                        <div class="mission-popup__inside">
                            <div
                                v-for="(mission, index) in missions"
                                :key="mission.id"
                                class="mission-popup__item"
                            >
                                <div class="mission-popup__item__info">
                                    <div class="mission-popup__item__name">
                                        {{index+1}}. {{mission.name}}
                                    </div>
                                    <div class="mission-popup__item__progress">
                                        <div class="mission-popup__item__progress__name">
                                            {{mission.persentPass}}%
                                        </div>
                                        <div
                                            class="mission-popup__item__progress__fill"
                                            :style="{width: mission.persentPass+'%'}"
                                        ></div>
                                    </div>
                                    <div class="mission-popup__items">
                                        <div
                                            v-for="(reward, index) in mission.reward"
                                            :key="index"
                                            class="mission-popup__item__part"
                                        >
                                            <div class="img">
                                                <img :src="require(`img/arena/${reward.name}.png`)" alt="">
                                            </div>
                                            <div class="num">{{reward.count}}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="mission-popup__item__monsters monsters">
                                    <div class="monsters__wrapper">
                                        <div
                                            v-for="monster in mission.enemies"
                                            :key="monster.id"
                                            class="monsters__one-monster"
                                        >
                                            <img :src="require(`img/personages/${monster.avatar}/icon.png`)" alt=""> <!--  TODO: переделать картинки мин в отдельной папке должны быть с таким же назаванием -->
                                            <div class="monsters__lvl">{{monster.lvl}}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="mission-popup__item__button button" @click="selectPersonages(mission)">
                                    <div class="button__img"><img src="~img/lightning-icon.png" alt=""></div>
                                    <div class="button__num"><div class="button__innernum">{{mission.energyCost}}</div></div>
                                    <div class="button__text">Битва</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <HeroChoose
                v-if="isChooseHeroes"
                :enemies="chooserEnemies"
                @closeChooser="closeChooser"
                @startFight="startFight"
            />
        </div>
    </transition>
</template>

<script>
import HeroChoose from '../../interface/HeroChoose.vue';
import * as MissionPopupComponents from './parts';

export default {
    name: '',
    components: {
        HeroChoose,
        ...MissionPopupComponents
    },
    data() {
        return {
            isChooseHeroes: false,
            chooserEnemies: [],
            currentMission: {},
            missions: []
        };
    },
    computed: {
        ...mapGetters('data', ['getMissions'])
    },
    mounted() {
        this.missions = this.getMissions;
    },
    methods: {
        selectPersonages(missionData) {
            this.showHeroChooser();
            this.chooserEnemies = missionData.enemies;
            this.currentMission = missionData;
        },
        startFight() {
            // Вычесть energy TODO: доделать

            // Передаем данные на арену
            this.setArenaInfo(this.currentMission);
            this.changeLocation('Arena');
        },
        showHeroChooser() {
            this.isChooseHeroes = true;
        },
        closeChooser() {
            this.isChooseHeroes = false;
        },
        ...mapMutations('gameInfo', ['changeLocation', 'setArenaInfo'])
    }
};
</script>

<style lang="scss" scoped>
.mission-popup {
  position: absolute;
  left: 7%;
  top: 8%;
  width: 85%;
  height: 90%;
  border: 2px solid #fff;
  border-radius: 5px;
  &__wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }
  &__content {
    position: absolute;
    width: 100%;
    top: 60px;
    left: 0;
    height: calc( 100% - 60px );
    overflow: hidden;
  }
  &__inside {
    position: relative;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    box-sizing: border-box;
    padding-top: 10px;
  }
  &__items {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  &__item {
    width: 100%;
    height: 100px;
    background: #5B5C56;
    border: 2px solid #fff;
    margin-bottom: 10px;
    display: flex;
    color: #fff;

    &__info {
      width: 40%;
      display: flex;
      flex-wrap: wrap;
      padding: 5px;
      box-sizing: border-box;
    }
    &__monsters {
      width: 40%;
      .monsters {
        &__wrapper {
          overflow-y: hidden;
          overflow-x: auto;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        &__one-monster {
          display: block;
          float: left;
          margin-right: 10px;
          width: 60px;
          height: 60px;
          position: relative;
          border-radius: 5px;
          overflow: hidden;
          border: 1px solid #fff;
        }
        &__lvl {
          position: absolute;
          bottom: 0;
          right: 0;
          padding: 0 5px;
          background: #000;
          border-radius: 5px;
        }
      }
    }
    &__button {
      width: calc(20% - 20px);
    }
    &__name {
      white-space: nowrap;
      width: 100%;
      margin-bottom: 10px;
    }
    &__progress {
      width: 100%;
      border: 1px solid #fff;
      border-radius: 5px;
      height: 21px;
      position: relative;
      margin-bottom: 10px;
      &__fill {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        background: #8ADB00;
        width: 50%;

        border-radius: 5px;
      }
      &__name {
        position: absolute;
        width: 100%;
        z-index: 2;
      }
    }
    &__part {
      display: flex;
      height: 32px;
      align-items: center;
      .img {
        img {
          width: 30px;
          margin-right: 10px;
        }
      }
    }
    &__gold {
      display: flex;
      height: 32px;
      align-items: center;
      width: 50%;
      .img {
        img {
          width: 30px;
          margin-right: 10px;
        }
      }
    }
    &__button {
      background: #FE9E08;
      box-sizing: border-box;
      margin: 13px 10px;
      border-radius: 5px;
      cursor: pointer;
      display: flex;
      flex-wrap: wrap;
      cursor: pointer;
      .button {
        &__img {
          width: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 30px;
          }
        }
        &__num {
          width: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        &__innernum {
          padding: 2px 10px;
          background: rgba(0,0,0,.6);
          border-radius: 5px;
        }
        &__text {
          width: 100%;
          color: #432721;
        }
      }
    }
  }
}
/* .slide-enter-active, .slide-leave-active {
  transition: .5s;
}
.slide-enter, .slide-leave-to {
  // transform: translateY(2);
  transform: translateY(90px);
  opacity: 0;
} */
</style>
