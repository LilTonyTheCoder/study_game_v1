<template>
	
	<div class="heroes__popup">
		<div class="heroes__close" @click="goBackToMain()" >X</div>
		<div class="heroes__top">
			<div class="heroes__avatars">
				<div class="heroes__avatars__wrapper">
					<div class="heroes__avatars__item" :class="{'--active' : currentActive === index}" v-for="(personage, index) in getPersonages" @click="changeCurrent(index)">
						<div class="heroes__avatars__item__img">
							<div v-if="!personage.available" class="heroes__avatars__item__img__lock">
								<img src="~img/lock.png" alt="">
							</div>
							<img :src="require(`img/personages/${personage.avatar}/icon.png`)" alt="">
						</div>
						<div class="heroes__avatars__item__power">
							<div class="heroes__avatars__item__power__text">{{personage.power}} / {{personage.maxPower}}</div>
							<div class="heroes__avatars__item__power__fill" :style="{width: persentPowerPersonage(personage)+'%'}"></div>
						</div>
					</div>
				</div>
			</div>
			<div class="heroes__study-button">
				<img src="~img/box.png" alt="">
				<div>Обучение</div>
			</div>
		</div>
		<div class="heroes__bottom">
			<div class="heroes__bottom__left">
				<div class="heroes__bottom__avatar">
					<img :src="require(`img/personages/${currentPersonage.avatar}/big-ava.png`)" alt="">
					<div class="heroes__bottom__skin-button">
						<img src="" alt="">
					</div>
				</div>
				<div class="heroes__bottom__skills">
					<div class="heroes__bottom__skills__name">
						Навык
					</div>
					<div class="heroes__bottom__skills__container">
						<div class="heroes__bottom__skills__item" v-for="skill in currentPersonage.skills">
							<img :src="require(`img/skills/${skill.name}.png`)" alt="">
							<span>{{skill.lvl}}</span>
						</div>
					</div>
				</div>
			</div>
			<div class="heroes__bottom__right">
			<div class="heroes__bottom__name">
				{{currentPersonage.name}}
				<div class="heroes__bottom__level">Уровень {{currentPersonage.lvl}}</div>
			</div>
			<div class="heroes__bottom__bars" v-if="currentPersonage.available">
				<div class="heroes__bottom__energy">
					<img src="~img/lightning-icon.png" alt="">
					<div class="heroes__bottom__ebar">
						{{currentPersonage.power}} / {{currentPersonage.maxPower}}
						<div class="heroes__bottom__ebar__fill"  :style="{width: persentPowerPersonage(currentPersonage)+'%'}"></div>
					</div>
				</div>
				<div class="heroes__bottom__timer">
					<div class="plus-button">+</div>
					<div>0:47</div>
				</div>
				<div class="heroes__bottom__xp">
					<img src="~img/xp.png" alt="">
					<div class="heroes__bottom__xpbar">
						{{currentPersonage.xp}} / {{currentPersonage.nextLvlXp}}
						<div class="heroes__bottom__xpbar__fill" :style="{width: 100*currentPersonage.xp/currentPersonage.nextLvlXp + '%'}"></div>
					</div>
				</div>
			</div>
			<div class="heroes__bottom__params" v-if="currentPersonage.available">
				<div class="left">
					
				<div class="heroes__bottom__params__names">
					<div>atk</div>
					<div>def</div>
				</div>
				<div class="heroes__bottom__params__numbers">
					<div>{{currentPersonage.str}}</div>
					<div>{{currentPersonage.def}}</div>
				</div>
			
				</div>
				<div class="right">
				<div class="heroes__bottom__params__names">
					<div>HP</div>
					<div>MP</div>
				</div>
				<div class="heroes__bottom__params__numbers">
					<div>{{currentPersonage.hp}}</div>
					<div>{{currentPersonage.mana}}</div>
				</div>
				</div>
			</div>
			<div class="heroes__bottom__description" v-if="!currentPersonage.available">
				Амазония - классная тетка. Но у тебя ее нет. Бегает по лесам, стреляет из лука, что еще надо? Бери ее немедленно!
			</div>
			<div class="heroes__bottom__cost" v-if="!currentPersonage.available">
				<img src="~img/gold-bar.png" alt="">{{currentPersonage.cost}} <button @click="buyPers(currentPersonage)">Нанять</button>
			</div>
				<!-- <div class="heroes__bottom__right__tabs">
					<div class="heroes__bottom__right__tabs__name">
						<div class="inner  --active">
							Амуниция
						</div>
					</div>
					<div class="heroes__bottom__right__tabs__name">
						<div class="inner">
							Руна
						</div>
					</div>
				</div> -->
				<!-- <div class="heroes__bottom__right__container">
					<div class="heroes__bottom__right__amunition">
						<div class="heroes__bottom__right__amunition__item">
							<img src="~img/amu1.png" alt="">
							<div class="stat">22</div>
						</div>
						<div class="heroes__bottom__right__amunition__item">
							<img src="~img/amu2.png" alt="">
							<div class="stat">22</div>
						</div>
						<div class="heroes__bottom__right__amunition__item">
							<img src="~img/amu3.png" alt="">
							<div class="stat">22</div>
						</div>
						<div class="heroes__bottom__right__amunition__item">
							<img src="~img/amu1.png" alt="">
							<div class="stat">22</div>
						</div>
						<div class="heroes__bottom__right__amunition__item">
							<img src="~img/amu2.png" alt="">
							<div class="stat">22</div>
						</div>
					</div>
				</div> -->
			</div>
		</div>
	</div>
	
</template>


<script>
export default {
  name: 'Heroes',
  components: {},
  data () {
    return {
    	currentActive: 0,
    }
  },
  computed: {
  	currentPersonage() {
  		return this.getPersonages[this.currentActive];
  	},
  	...mapGetters('data', ['getPersonages', 'getGoods'])
  },
  methods: {
  	persentPowerPersonage(personage) {
  		return 100*personage.power/personage.maxPower;
  	},
  	goBackToMain() {
  	    this.changeMenuScreen('MenuMainList');
  	},
  	changeCurrent(index) {
  		this.currentActive = index;
  	},
  	buyPers(personage) {
  		if (personage.cost >= this.getGoods.gold) return alert('Не хватает бабла');
  		this.buyPersonage(personage.id);
  	},
  	...mapMutations('gameInfo', ['changeMenuScreen']),
  	...mapMutations('data', ['buyPersonage'])
  }
}
</script>


<style lang="scss">
$topHeight: 90px;
	.heroes {
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
		&__popup {
			position: relative;
			top: 10px;
			width: 85%;
			left: 7%;
			height: calc(100% - 50px);
			background: #000000c7;
			display: flex;
			flex-direction: column;
			border-radius: 6px;
		}
		&__top {
			height: $topHeight;
			display: flex;
		}
		&__avatars {
			width: 79%;
			margin-right: 1%;
			background: #000;
			border: 1px solid #eee;
			border-radius: 6px;
			overflow: hidden;
			&__wrapper {
				overflow: auto;
				overflow-y: hidden;
				display: flex;
				padding: 3px 10px;
				height: 100%;
				box-sizing: border-box;
			}
			&__item {
				width: 60px;
				margin-right: 25px;
				position: relative;
				cursor: pointer;
				&.--active {
					box-shadow: 0 0 13px #335fff, 0 0 13px #335fff, 0 0 13px #fff;
				}
				&__img {
					border: 4px solid #eee;
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
		}
		&__study-button {
			width: 20%;
			background: #000;
			border-radius: 6px;
			border: 1px solid #eee;
			color: #fff;
			font-weight: bold;
			box-sizing: border-box;
			padding: 10px 0;
			img {
				width: 50px;
			}
		}
		&__bottom {
			height: calc(100% - #{$topHeight});
			display: flex;
			&__left {
				width: 50%;
				display: flex;
				flex-wrap: wrap;
				position: relative;
			}
			&__avatar {
				width: 100%;
				height: 100%;
				img {
					width: 100%;
				}
			}
			&__skills {
				width: 100%;
				min-height: 40%;
				position: absolute;
				bottom: 10px;
				left: 0;
				display: flex;
				align-items: flex-start;
				justify-content: flex-end;
				flex-direction: column;
				&__name {
					padding: 2px 10px;
					background: #7A7A7A;
					color: #fff;
					border-radius: 6px 6px 0 0;
				}
				&__container {
					border: 1px solid #7A7A7A;
					width: 100%;
					display: flex;
					padding: 5px 0;
					flex-grow: 1;
					background: #3b3d3f;
					display: flex;
				}
				&__item {
					position: relative;
					cursor: pointer;
					margin-right: 1%;
					width: 50px;
					height: 50px;
					img {
						box-sizing: border-box;
						width: 50px;
						border: 2px solid #eee;
					}
					span {
						position: absolute;
						display: block;
						width: 20px;
						right: 3px;
						bottom: 3px;
						text-align: center;
						font-weight: bold;
					}
				}
			}
			&__upgrade {
				width: 49%;
				margin-left: 1%;
				min-height: 40%;
				position: absolute;
				bottom: 10px;
				left: 50%;
				display: flex;
				align-items: flex-start;
				justify-content: flex-end;
				flex-direction: column;
				&__name {
					padding: 2px 10px;
					background: #7A7A7A;
					color: #fff;
					border-radius: 6px 6px 0 0;
					cursor: pointer;
				}
				&__container {
					border: 1px solid #7A7A7A;
					width: 100%;
					display: flex;
					flex-wrap: wrap;
					box-sizing: border-box;
					padding: 5px 10px;
					flex-grow: 1;
					background: #3b3d3f;
				}
				&__item {
					width: 20%;
					margin: 0 2%;
					position: relative;
					img {
						width: 100%;
					}
					span {
						display: block;
						position: absolute;
						right: 0;
						bottom: 0;
						border-radius: 50%;
						background: #eee;
						width: 15px;
						height: 15px;
						font-size: 12px;
						font-weight: bold;
					}
				}
			}
			&__right {
				width: 50%;
				display: flex;
				flex-direction: column;
				box-sizing: border-box;
				padding: 5px 10px;
			}
			&__name {
				font-size: 22px;
				display: flex;
				align-items: center;
				margin-bottom: 10px;
				color: #fff;
			}
			&__level {
				margin-left: 10px;
				font-size: 14px;
			}
			&__bars {
				display: flex;
				flex-wrap: wrap;
				margin-bottom: 10px;
			}
			&__energy {
				width: 50%;
				display: flex;
				align-items: center;
				img {
					width: 20%;
					height: 100%;
				}
			}
			&__ebar {
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
			&__timer {
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
			&__xp {
				width: 50%;
				display: flex;
				align-items: center;
				img {
					width: 20%;
					height: 100%;
				}
			}
			&__xpbar {
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
			&__params {
				display: flex;
				.left {
					display: flex;
					width: 50%;
					color: #fff;
				}
				.right {
					display: flex;
					width: 50%;
					color: #fff;
				}
				margin-bottom: 10px;
			}
			&__description {
				color: #fff;
				font-size: 24px;
				margin-bottom: 40px;
				margin-top: 30px;
			}
			&__cost {
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
			&__params__names {
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
			&__params__numbers {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: flex-start;
			}
			&__right__tabs {
				display: flex;
				&__name {
					width: 50%;
					display: flex;
					justify-content: flex-start;
					.inner {
						padding: 2px 10px;
						border-radius: 6px 6px 0 0;
						background: #333;
						color: #585858;
						cursor: pointer;
						&.--active {
							background: #7A7A7A;
							color: #fff;
						}
					}
				}
			}
			&__right__amunition {
				display: flex;
				border: 1px solid #7A7A7A;
				display: flex;
				box-sizing: border-box;
				padding: 0 10px;
				overflow: hidden;
				background: #3b3d3f;
				&__item {
					position: relative;
					margin-right: 10px;
					cursor: pointer;
					.stat {
						position: absolute;
						top: 0;
						left: 0;
						color: #fff;
						font-weight: bold;
					}
					img {
						height: 90%;
					}
				}
			}
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
		cursor: pointer
	}
</style>