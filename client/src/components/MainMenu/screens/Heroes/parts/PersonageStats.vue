<template>
    <div class="right">
        <div class="name">
            {{currentPersonage.name}}
            <div class="level">Уровень {{currentPersonage.lvl}}</div>
        </div>

        <div v-if="currentPersonage.available" class="bars">
            <div class="energy">
                <img src="~img/lightning-icon.png" alt="">
                <div class="ebar">
                    {{currentPersonage.attributes.energy}} / {{maximumEnergy}}
                    <div class="ebar__fill"  :style="{width: persentPowerPersonage(currentPersonage)+'%'}"></div>
                </div>
            </div>
            <div class="timer">
                <div v-if="!isEnergyFull" class="plus-button" @click="buyFullEnergy()">+</div>
                <div>{{getFullRecoverEnergyTime}}</div>
            </div>
            <div class="xp">
                <img src="~img/xp.png" alt="">
                <div class="xpbar">
                    {{currentPersonage.attributes.xp}} / {{experienceNeed}}
                    <div class="xpbar__fill" :style="experineceBarStyle"></div>
                </div>
            </div>
        </div>

        <div v-if="currentPersonage.available" class="params">
            <div v-for="(value, key) in currentPersonage.stats" :key="key" class="params__block">{{key}} : {{calculateParam(key, value, currentPersonage.lvl)}}</div>
        </div>

        <div v-if="!currentPersonage.available" class="description">
            Амазония - классная тетка. Но у тебя ее нет. Бегает по лесам, стреляет из лука, что еще надо? Бери ее немедленно!
        </div>

        <div v-if="!currentPersonage.available" class="cost">
            <img src="~img/gold-bar.png" alt="">{{currentPersonage.cost}} <button @click="buyPers(currentPersonage)">Нанять</button>
        </div>

    </div>
</template>

<script>
import expTable from 'js/expTable';
import getParam from 'js/getParam';

export default {
    name: 'PersonageStats',
    props: {
        currentPersonage: {
            type: Object
        }
    },
    data() {
        return {};
    },
    computed: {
        prevExperienceNeed() {
            let prevLvlExp = expTable[this.currentPersonage.lvl - 1];
            if (prevLvlExp) return prevLvlExp;
            return 0; // когда уже на последнем уровне
        },
        experienceNeed() {
            let nextLvlExp = expTable[this.currentPersonage.lvl];
            if (nextLvlExp) return nextLvlExp;
            return 99999; // когда уже на последнем уровне
        },
        experineceBarStyle() {
            const { currentPersonage, experienceNeed, prevExperienceNeed } = this;
            return { width: 100 * (currentPersonage.attributes.xp - prevExperienceNeed) / (experienceNeed - prevExperienceNeed) + '%' };
        },
        isEnergyFull() {
            return this.currentPersonage.attributes.energy === this.maximumEnergy;
        },
        getFullRecoverEnergyTime() {
            if (this.isEnergyFull) return;
            const energyTicker = this.tickers.find(el => el.name === 'addEnergy');
            const oneSecondTicker = this.tickers.find(el => el.name === 'oneSecondPass');
            let totalSec = ((this.maximumEnergy - this.currentPersonage.attributes.energy) / energyTicker.prop) * energyTicker.interval;
            let decreaseSec = oneSecondTicker.lastTime - energyTicker.lastTime;
            if (decreaseSec < 0) decreaseSec = 0;
            totalSec -= decreaseSec;
            totalSec = Math.round(totalSec / 1000);
            let min = Math.floor(totalSec / 60);
            if (min < 10) min = '0' + min;
            let sec = totalSec % 60;
            if (sec < 10) sec = '0' + sec;
            return `${min} : ${sec}`;
        },
        ...mapGetters('data', ['getGoods']),
        ...mapState('data', ['maximumEnergy']),
        ...mapState('gameInfo', ['tickers'])
    },
    methods: {
        persentPowerPersonage(personage) {
            return 100 * personage.attributes.energy / this.maximumEnergy;
        },
        buyPers(personage) {
            if (personage.cost >= this.getGoods.gold) return alert('Не хватает бабла');
            this.buyPersonage(personage.id);
        },
        calculateParam(key, value, lvl) {
            return getParam(key, value, lvl);
        },
        buyFullEnergy() {
            const { lvl } = this.currentPersonage;
            const energyTicker = this.tickers.find(el => el.name === 'addEnergy');
            let intervalsNeeded = ((this.maximumEnergy - this.currentPersonage.attributes.energy) / energyTicker.prop);
            const price = intervalsNeeded * lvl * 10;
            const agree = confirm(`Для полного восстановления энергии нужно ${price} золота. Оплатить?`);
            if (agree) {
                if (price > this.getGoods.gold) {
                    alert('Не хватает золота');
                } else {
                    this.addGoods({ name: 'gold', count: -price });
                    this.addEnergyToOnePersonage({ id: this.currentPersonage.id, amount: 9999 });
                }
            }
        },
        ...mapMutations('data', ['buyPersonage', 'addGoods', 'addEnergyToOnePersonage'])
    }
};
</script>

<style lang="scss" scoped>
.right {
    width: 50%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 5px 10px;
}
.name {
    font-size: 22px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    color: #fff;
}
.level {
    margin-left: 10px;
    font-size: 14px;
}
.bars {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
}
.energy {
    width: 50%;
    display: flex;
    align-items: center;
    img {
        width: 20%;
        height: 100%;
    }
}
.ebar {
    width: 70%;
    margin-left: 10%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #fff;
    border-radius: 6px;
    height: 20px;
    color: #fff;
    font-size: 12px;
    z-index: 1;
    &__fill {
        background: #ff7d00;
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 80%;
        border-radius: 6px;
        z-index: -1;
        transition: .3s;
    }
}
.timer {
    width: 50%;
    display: flex;
    box-sizing: border-box;
    padding-left: 15px;
    align-items: center;
    color: #fff;
    .plus-button {
        margin-right: 10px;
    }
}
.xp {
    width: 50%;
    display: flex;
    align-items: center;
    img {
        width: 20%;
        height: 100%;
    }
}
.xpbar {
    width: 70%;
    margin-left: 10%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #fff;
    border-radius: 6px;
    height: 20px;
    color: #fff;
    font-size: 12px;
    z-index: 1;
    &__fill {
        background: #5890F8;
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 90%;
        border-radius: 6px;
        z-index: -1;
        transition: .3s;
    }
}
.params {
    margin-bottom: 10px;
    color: #fff;
    font-size: 18px;
    &__block {
        margin-bottom: 10px;
    }
    &__names {
        background: grey;
        border-radius: 6px;
        padding: 0 5px;
        color: #fff;
        text-transform: uppercase;
        font-size: 14px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-right: 5px;
    }
    &__numbers {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }
}
.description {
    color: #fff;
    font-size: 24px;
    margin-bottom: 40px;
    margin-top: 30px;
}
.cost {
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    img {
        width: 30px;
        margin-right: 10px;
    }
    button {
        margin-left: 20px;
    }
}
.plus-button {
    width: 30px;
    height: 30px;
    border-radius: 6px;
    background: linear-gradient(-45deg, #b03a32, #7f0d03, #b03a32);
    color: #fff;
    font-size: 26px;
    font-weight: bold;
    text-align: center;
    line-height: 26px;
    text-indent: 1px;
    cursor: pointer;
}
</style>
