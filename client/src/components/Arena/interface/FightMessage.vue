<template>
    <div class="arena__bottom-popup bottom-popup">
        <p class="bottom-popup__title">{{skillName}}</p>
        <p class="bottom-popup__text">{{skillVerbName}}. Урон {{skillDamage}}!</p>
    </div>
</template>
<script>
export default {
    name: 'FightMessage',
    props: {
        currentSkillObj: {
            type: Object
        },
        skillDamage: {
            type: Number
        }
    },
    computed: {
        skillName() {
            return this.currentSkillObj.nameRus;
        },
        skillVerbName() {
            return this.currentSkillObj.verb;
        },
        ...mapState('data', ['personages'])
    }
};
</script>
<style lang="scss">
.bottom-popup {
    position: absolute;
    z-index: 10;
    width: 100%;
    height: 80px;
    bottom: 0;
    left: 0;
    background: rgba(0,0,0,.9);
    display: flex;
    flex-direction: column;
    justify-content: center;
    &__title {
        font-size: 24px;
        color: #8c8cff;
        margin: 0;
        text-align: left;
        padding-left: 20px;
        margin-bottom: 5px;
    }
    &__text {
        color: #fff;
        margin: 0;
        text-align: left;
        padding-left: 20px;
    }
}
</style>
