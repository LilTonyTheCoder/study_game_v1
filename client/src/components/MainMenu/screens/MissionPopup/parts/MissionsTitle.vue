<template>
    <div class="top">
        <div v-if="titleType === 'child'" class="name">{{missionIndex + missionTitle}}</div>
        <div v-else class="name">Меняем локацию</div>
        <div v-if="titleType === 'child'" class="back" @click="changeMissionsParent()">Сменить локацию</div>
        <div v-if="titleType === 'child'" class="back" @click="goBackToMain()">Назад</div>
        <!-- <div class="second-block">
<div class="level">
Уровень 3
</div>
<div class="stars">
<img src="../../assets/img/star.png" alt="">
<img src="../../assets/img/star.png" alt="">
<img src="../../assets/img/star.png" alt="">
</div>
<div class="progress">
<div class="progress__name">50 %</div>
<div class="progress__fill"></div>
</div>
</div> -->
    </div>
</template>

<script>
export default {
    name: 'MissionsTitle',
    props: {
        titleType: {
            type: String
        }
    },
    computed: {
        missionIndex() {
            if (!this.getMissionsNew.regularMissions) return;
            const index = this.getMissionsNew.regularMissions.findIndex(item => item.id === this.selectedMissionId);
            if (index !== -1) return index + 1 + '. ';
            return '';
        },
        missionTitle() {
            if (!this.getMissionsNew.regularMissions) return;
            let missionItem = this.getMissionsNew.regularMissions.find(item => item.id === this.selectedMissionId);
            if (missionItem) return missionItem.name;
            missionItem = this.getMissionsNew.specialMissions.find(item => item.id === this.selectedMissionId);
            if (missionItem) return missionItem.name;
            return this.getMissionsNew.regularMissions[0].name;
        },
        ...mapGetters('data', ['getMissions', 'getMissionsNew']),
        ...mapState('gameInfo', ['selectedMissionId'])
    },
    methods: {
        goBackToMain() {
            this.changeMenuScreen('MainList');
        },
        changeMissionsParent() {
            this.$emit('changeMissionsParent');
        },
        ...mapMutations('gameInfo', ['changeMenuScreen'])
    }
};
</script>

<style lang="scss" scoped>
.top {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background: rgba(0,0,0,.7);
    display: flex;
    align-items: center;
    color: #fff;
    padding: 0 20px;
    justify-content: space-between; // потом убрать
  }
.name {
    font-size: 22px;
    width: 40%;
  }
.back {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    background: #2C315C;
    cursor: pointer;
}
.second-block {
    display: flex;
    width: 40%;
    flex-wrap: wrap;
    box-sizing: border-box;
    padding: 0 20px;
    justify-content: flex-end;
}
.level {
    width: 50%;
  }
.stars {
    width: 50%;
    img {
      width: 20px;
    }
}
.progress {
    margin-top: 5px;
    position: relative;
    width: 70%;
    border-radius: 5px;
    // background: #8ADB00;
    border: 1px solid #fff;
    height: 20px;
    &__name {
      position: absolute;
      width: 100%;
      text-align: center;
      z-index: 2;
      font-size: 14px;
      height: 100%;
      line-height: 20px;
    }
    &__fill {
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      width: 50%;
      border-radius: 5px;

      background: #8ADB00;
    }
}
</style>
