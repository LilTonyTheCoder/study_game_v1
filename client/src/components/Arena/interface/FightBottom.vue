<template>
    <div class="bottom-bar">
        <div class="bottom-bar__wrapper">
            <div class="bottom-bar__left">
                <div class="bottom-bar__speed-btn btn">
                    <img src="~img/play.png" alt="">
                </div>
                <div class="bottom-bar__finish-btn btn">
                    <img src="~img/quick-play.png" alt="">
                </div>
            </div>
            <div v-if="personageId" class="bottom-bar__right">
                <div class="bottom-bar__actions actions">
                    <div
                        v-for="(skill, index) in personageSkills(personageId)"
                        :key="index"
                        :class="{
                            'disable' : isSkillDisable(skill.name),
                            'active' : isSkillActive(index)
                        }"
                        class="actions__item"
                        @click="selectCurrentSkillActive(index, skill.name)"
                    >
                        <img :src="skillImg(skill.name)" alt="">
                        <div class="actions__lvl">{{skill.lvl}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'FightBottom',
    props: {
        personageId: {
            type: String,
            default: ''
        },
        currentActiveSkill: {
            type: Number,
            default: 0
        }
    },
    computed: {
        ...mapState('data', ['personages'])
    },
    methods: {
        personageSkills() {
            let currentPersonage = this.personages.find(personage => personage.id === this.personageId);
            console.dir(currentPersonage);
            return currentPersonage.skills;
        },
        skillImg(skillName) {
            let skillSrc = require('img/skills/skill1.png'); // TODO: default skill img
            try {
                skillSrc = require(`img/skills/${skillName}.png`);
            } catch (error) {}
            return skillSrc;
        },
        isSkillDisable(skillName) {
            let currentPersonage = this.personages.find(personage => personage.id === this.personageId);
            let currentSkill = skills.find(skill => skill.name === skillName);
            return currentPersonage.mana < currentSkill.manaCost;
        },
        isSkillActive(index) {
            return index === this.currentActiveSkill;
        },
        selectCurrentSkillActive(index, skillName) {
            if (this.isSkillDisable(skillName)) return;
            this.$emit('selectCurrentSkillActive', index);
        }
    }
};
</script>
<style lang="scss">
.bottom-bar {
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  height: 50px;
  display: flex;
  &__wrapper {
    position: relative;
    display: flex;
    width: 100%;
  }
  &__left {
    width: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__speed-btn, &__finish-btn {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #FFC814;
    cursor: pointer;
    margin: 0 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 3px solid #fff;
    img {
      width: 18px;
    }
  }
  &__right {
    width: 70%;
    // background: blue;
      .actions {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        &__item {
          width: 30px;
          height: 30px;
          background: #eee;
          border-radius: 6px;
          margin: 0 5px;
          border: 3px solid #eee;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          &.active {
              box-shadow: 0px 0px 8px 3px rgba(139,230,237,1);
          }
          &.disable {
            box-shadow: none;
            img {
              filter: grayscale(100%);
            }
          }
          img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
        }
        &__lvl {
            position: absolute;
            right: 3px;
            bottom: 0;
            font-size: 12px;
        }
      }
  }
}
</style>
