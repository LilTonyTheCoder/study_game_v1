<template>
    <div>
        <div class="shadow" @click="closeChooser"></div>
        <div class="choose">
            <div class="choose__title">Выбор героев</div>
            <div class="choose__container">
                <div class="choose__my-team">
                    <div v-for="chosenId in activeTeam" class="choose__img choose__img--can-delete" @click="removePers(chosenId)">
                        <img :src="require(`img/personages/${chosenHeroAva(chosenId)}/icon.png`)"><div class="choose__lvl">{{chosenHeroLvl(chosenId)}}</div>
                    </div>
                    <div v-for="empty in emptyHeroes" class="choose__img"></div>
                </div>
                <div class="choose__vs">VS</div>
                <div class="choose__enemy">
                    <div v-for="enemy in enemies" class="choose__img"><img :src="require(`img/personages/${enemy.avatar}/icon.png`)"><div class="choose__lvl">{{enemy.lvl}}</div></div>
                    <div v-for="num in emptyEnemies" class="choose__img"></div>
                </div>
            </div>
            <div class="choose__title">Все мои персонажи</div>
            <div class="choose__all-personages">
                <div class="choose__inside">

                    <div
                        v-for="personage in getPersonages"
                        class="item"
                        :class="{'item--can-add' : canAddPers(personage)}"
                        @click="addPersonage(personage)"
                    >
                        <div class="item__img">
                            <div v-if="!personage.available" class="item__img__lock">
                                <img src="~img/lock.png" alt="">
                            </div>
                            <img :src="require(`img/personages/${personage.avatar}/icon.png`)" alt="" >
                            <div class="item__lvl">{{personage.lvl}}</div>
                        </div>
                        <div v-if="personage.available" class="item__power">
                            <div class="item__power__text">{{personage.power}} / {{personage.maxPower}}</div>
                            <div class="item__power__fill" :style="{width: 100*personage.power/personage.maxPower+'%'}" ></div>
                        </div>
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
export default {
    name: 'HeroChoose',
    props: {
        enemies: {
            type: Array,
            default: []
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
	.item {
		width: 60px;
		margin-right: 25px;
		position: relative;
		cursor: pointer;
		&--can-add {
			&::after {
				display: block;
				content: "+";
				position: absolute;
				left: -7px;
				top: -7px;
				width: 30px;
				height: 30px;
				border-radius: 50%;
				background: #0fb705;
				display: flex;
				justify-content: center;
				font-weight: bold;
				color: #fff;
				font-size: 36px;
				line-height: 24px;
			}
		}
		&.--active {
			box-shadow: 0 0 13px #335fff, 0 0 13px #335fff, 0 0 13px #fff;
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
			border: 2px solid #eee;
			border-radius: 6px;
			overflow: hidden;
			height: 60px;
			box-sizing: border-box;
			position: relative;
			&__lock {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background: rgba(0,0,0,.7);
				img {
					position: absolute;
					width: 15px;
					right: 0;
					top: 0;
				}
			}
		}
		&__power {
			position: relative;
			bottom: 0;
			left: -4px;
			width: 67px;
			background: linear-gradient(#414240, #717172);
			border-radius: 6px;
			border: 2px solid #a09d98;
			color: #fff;
			font-size: 12px;
			height: 21px;
			display: flex;
			justify-content: center;
			align-items: center;
			&::before {
				content: "";
				display: block;
				position: absolute;
				left: -14px;
				top: -2px;
				width: 30px;
				height: 30px;
				background: url(~img/lightning-icon.png) center center no-repeat;
				background-size: contain;
				z-index: 10;
			}
			&__text {
				z-index: 11;
			}
			&__fill {
				position: absolute;
				height: 100%;
				width: 40%;
				background: #ff7d00;
				top: 0;
				left: 0;
			}
		}
	}
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
</style>
