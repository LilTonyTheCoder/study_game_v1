<template>
    <div>
        <div class="shadow" @click="closeChooser"></div>
        <div class="choose">
            <div class="choose__title">Выбор героев</div>
            <div class="choose__container">
                <div class="choose__my-team">
                    <div
                        v-for="chosenId in activeTeam"
                        :key="chosenId"
                        class="choose__img choose__img--can-delete"
                        @click="removePers(chosenId)"
                    >
                        <img :src="require(`img/personages/${chosenHeroAva(chosenId)}/icon.png`)"><div class="choose__lvl">{{chosenHeroLvl(chosenId)}}</div>
                    </div>
                    <div
                        v-for="empty in emptyHeroes"
                        :key="empty"
                        class="choose__img"
                    ></div>
                </div>
                <div class="choose__vs">VS</div>
                <div class="choose__enemy">
                    <div
                        v-for="enemy in enemies"
                        :key="enemy.id"
                        class="choose__img"
                    ><img :src="require(`img/personages/${enemy.avatar}/icon.png`)"><div class="choose__lvl">{{enemy.lvl}}</div></div>
                    <div
                        v-for="num in emptyEnemies"
                        :key="num"
                        class="choose__img"
                    ></div>
                </div>
            </div>
            <div class="choose__title">Все мои персонажи</div>
            <div class="choose__all-personages">
                <div class="choose__inside">
                    <div
                        v-for="personage in getPersonages"
                        :key="personage.id"
                        class="mr25"
                    >
                        <PersonageIcon 
                            
                            :personage="personage"
                            @addPersonage="addPersonage(personage)"
                            :canAddPers="canAddPers(personage)"
                        />
                    </div>
                    

                </div>
            </div>
            <div class="choose__buttons">
                <div class="choose__button choose__start" @click="startFight">Играть</div>
                <div class="choose__button choose__cancle" @click="closeChooser">Отмена</div>
            </div>
        </div>
    </div>
</template>

<script>
import PersonageIcon from './PersonageIcon.vue';

export default {
    name: 'HeroChoose',
    components: {
        PersonageIcon
    },
    props: {
        enemies: {
            type: Array
        }
    },
    data() {
        return {
            maxChosen: 3
        };
    },
    computed: {
        emptyEnemies() {
            return this.enemies.length <= 3 ? 3 - this.enemies.length : 0;
        },
        emptyHeroes() {
            let { maxChosen, activeTeam } = this;
            return activeTeam.length <= maxChosen ? maxChosen - activeTeam.length : 0;
        },
        ...mapGetters('data', ['getPersonages']),
        ...mapState('gameInfo', ['activeTeam'])
    },
    methods: {
        closeChooser() {
            this.$emit('closeChooser');
        },
        addPersonage(personage) {
            if (!personage.available || this.activeTeam.length >= this.maxChosen) return;

            const isAlreadyHere = this.activeTeam.find(persId => personage.id === persId);
            if (isAlreadyHere) return;

            this.addToActiveTeam(personage.id);
        },
        chosenHeroAva(id) {
            return this.getPersonages.find(personage => personage.id === id).avatar || '';
        },
        chosenHeroLvl(id) {
            return this.getPersonages.find(personage => personage.id === id).lvl || '';
        },
        removePers(id) {
            this.removeFromActiveTeam(id);
        },
        canAddPers(personage) {
            if (!personage.available) return false;
            const isAlreadyHere = this.activeTeam.find(persId => personage.id === persId);
            if (isAlreadyHere) return false;
            return true;
        },
        startFight() {
            if (this.activeTeam.length < 1) {
                alert('Выберете хоть кого то в бой');
                return;
            }
            this.$emit('startFight');
        },
        ...mapMutations('gameInfo', ['removeFromActiveTeam', 'addToActiveTeam'])
    }
};
</script>

<style scoped lang="scss">
.shadow {
    width: 100%;
    height: 100%;
    position: absolute;
    background:rgba(0,0,0,.8);
    top: 0;
    cursor: pointer;
}
.choose {
    position: absolute;
    left: 7%;
    top: 8%;
    width: 85%;
    height: 70%;
    border-radius: 5px;
    border: 2px solid #fff;
    border-radius: 5px;
    background: #333;
    padding: 10px 20px;
    z-index: 10;
    box-sizing: border-box;
    &__title {
        font-size: 24px;
        color: #fff;
        margin-bottom: 20px;
    }
    &__container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 40px;
    }
    &__my-team {
        display: flex;
    }
    &__enemy {
        display: flex;
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
        border: 2px solid #fff;
        border-radius: 5px;
        margin-right: 10px;
        width: 60px;
        height: 60px;
        cursor: pointer;
        background: radial-gradient(#000, #333);
        position: relative;
        &--can-delete {
            &::after {
                display: block;
                content: "-";
                position: absolute;
                left: -7px;
                top: -7px;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background: #b70505;
                display: flex;
                justify-content: center;
                font-weight: bold;
                color: #fff;
                font-size: 36px;
                line-height: 19px;
            }
        }
        &:last-child {
            margin-right: 0;
        }
    }
    &__vs {
        font-size: 24px;
        font-weight: bold;
        color: #fff;
    }
    &__inside {
        display: flex;
        width: 1000px;
        padding: 0 20px;
    }
    &__all-personages {
        width: 100%;
        margin-bottom: 100px;
    }
    &__buttons {
        display: flex;
        justify-content: flex-end;
    }
    &__button {
        background: #fff;
        padding: 10px 20px;
        margin-right: 10px;
        cursor: pointer;
        border-radius: 5px;
        &:last-child {
            margin-right: 0;
        }
    }
}
.mr25 {
    margin-right: 25px;
}
</style>
