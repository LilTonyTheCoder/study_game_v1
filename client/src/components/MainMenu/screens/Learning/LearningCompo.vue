<template>
    <div class="learning">
        <div class="learning__close" @click="goBackToHeroes()">X</div>
        <div class="learning__title">Тренировка <div class="learning__subtitle">Прокачай героя по максимуму</div></div>
        <div class="learning__slider">
            <div class="learning__wrapper">
                <div v-for="personage in noneMaxLvlPersonages" class="learning__item item">
                    <div class="item__name">{{ personage.name }}</div>
                    <div class="item__img"><img :src="require(`img/personages/${ personage.avatar }/ava1.png`)" alt=""></div>
                    <div class="item__lvl">Уровень {{ personage.lvl }} -> Уровень {{ personage.lvl + 1 }}</div>
                    <div class="item__timer">{{ learningTimer(personage.id) }}</div>
                    <div class="item__gold">cost: {{ trainingPrice }}</div>

                    <div
                        v-if="!personage.trainingStartsAt"
                        class="item__btn"
                        @click="trainPersonage(personage.id)"
                    >
                        Тренировать
                    </div>
                    <div v-else>Тренируемся</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'LearningCompo',
    data() {
        return {
            trainingPrice: 100,
            noneMaxLvlPersonages: [],
        };
    },
    computed: {
        maxLvl() {
            const levelsArray = this.getAvailablesPersonages.map(el => el.lvl);
            return Math.max.apply(null, levelsArray);
        },
        ...mapGetters('data', ['getAvailablesPersonages', 'getGoods']),
        ...mapState('gameInfo', ['tickers'])
    },

    mounted() {
        this.setPersonagesToData()
    },

    methods: {
        setPersonagesToData() {
            this.noneMaxLvlPersonages = this.getAvailablesPersonages.filter(el => el.lvl < this.maxLvl);
        },
        goBackToHeroes() {
            this.changeMenuScreen('Heroes');
        },
        trainPersonage(id) {
            if (this.trainingPrice > this.getGoods.gold) {
                alert('Не хватает денег');
            } else {
                console.log('Starts training');
                this.startPersonageTraining(id);
                this.setPersonagesToData()
            }
        },
        learningTimer(personageId) {
            const currentPersonage = this.getAvailablesPersonages.find(el => el.id === personageId)

            if (!currentPersonage) return '00 : 03 : 00';
            if (!currentPersonage.trainingStartsAt) return '00 : 03 : 00';

            const energyTicker = currentPersonage.trainingStartsAt
            const oneSecondTicker = this.tickers.find(el => el.name === 'oneSecondPass');

            let totalSec = this.oneSecondTicker.lastTime - this.energyTicker
            totalSec = Math.round(totalSec / 1000);
            let min = Math.floor(totalSec / 60);
            if (min < 10) min = '0' + min;
            let sec = totalSec % 60;
            if (sec < 10) sec = '0' + sec;
            return `${min} : ${sec}`;
        },
        ...mapMutations('gameInfo', ['changeMenuScreen']),
        ...mapMutations('data', ['startPersonageTraining'])
    }
};
</script>
<style scoped lang="scss">
    .learning {
        position: relative;
        top: 10px;
        width: 85%;
        left: 7%;
        height: calc(100% - 50px);
        background: #000000c7;
        display: flex;
        flex-direction: column;
        border-radius: 6px;
        box-sizing: border-box;
        padding: 20px 30px;
        &__title {
            color: #fff;
            font-size: 24px;
            margin-bottom: 20px;
        }
        &__subtitle {
            font-size: 16px;
            margin-left: 20px;
            display: inline-block;
        }
        &__close {
            position: absolute;
            width: 50px;
            height: 50px;
            content: "X";
            top: -25px;
            right: -15px;
            background: #5d6088;
            z-index: 9;
            border-radius: 50%;
            cursor: pointer;
            font-size: 30px;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
        }
        &__slider {
            width: 100%;
            overflow: hidden;
        }
        &__wrapper {
            overflow: auto;
            overflow-y: hidden;
            display: flex;
            height: 100%;
            box-sizing: border-box;
        }
        .item {
            width: 230px;
            background: #5d5d5d;
            margin-right: 20px;
            flex-shrink: 0;
            border-radius: 6px;
            border: 7px solid #c7c7c7;
            margin-bottom: 30px;
            text-align: center;
            color: #fff;
            padding: 10px 0;
            box-sizing: border-box;
            div {
                margin-bottom: 10px;
                &:last-child {
                    margin-bottom: 0;
                }
            }
            &:last-child {
                margin-right: 0;
            }
            &__img {
                img {
                    width: 100%;
                }
            }
            &__btn {
                display: inline-block;
                padding: 5px 10px;
                border: 1px solid #000;
                cursor: pointer;
                &:hover {
                    background: #dedede;
                }
            }
        }
    }
</style>
