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
                    {{currentPersonage.power}} / {{currentPersonage.maxPower}}
                    <div class="ebar__fill"  :style="{width: persentPowerPersonage(currentPersonage)+'%'}"></div>
                </div>
            </div>
            <div class="timer">
                <div class="plus-button">+</div>
                <div>0:47</div>
            </div>
            <div class="xp">
                <img src="~img/xp.png" alt="">
                <div class="xpbar">
                    {{currentPersonage.xp}} / {{currentPersonage.nextLvlXp}}
                    <div class="xpbar__fill" :style="{width: 100*currentPersonage.xp/currentPersonage.nextLvlXp + '%'}"></div>
                </div>
            </div>
        </div>

        <div v-if="currentPersonage.available" class="params">
            <div v-for="block in stats" :key="block" class="params__block">
                <div class="params__names">
                    <div v-for='statName in block' :key="statName">{{statName}}</div>
                </div>
                <div class="params__numbers">
                    <div v-for='statName in block' :key="statName">{{currentPersonage[statName]}}</div>
                </div>
            </div>
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
export default {
    name: 'PersonageStats',
    props: {
        currentPersonage: {
            type: Object
        }
    },
    data() {
        return {
            stats: [
                ['str', 'def'],
                ['hp', 'mana']
            ]
        };
    },
    computed: {
        ...mapGetters('data', ['getGoods'])
    },
    methods: {
        persentPowerPersonage(personage) {
            return 100 * personage.power / personage.maxPower;
        },
        buyPers(personage) {
            if (personage.cost >= this.getGoods.gold) return alert('Не хватает бабла');
            this.buyPersonage(personage.id);
        },
        ...mapMutations('data', ['buyPersonage'])
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
    }
}
.params {
    display: flex;
    margin-bottom: 10px;
    &__block {
        display: flex;
        width: 50%;
        color: #fff;
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
