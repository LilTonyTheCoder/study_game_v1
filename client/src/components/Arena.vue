<template>
    <div class="arena std-block">
        <Header></Header>
        <div class="arena__bg">
            <img src="~img/locations/location1.jpeg" alt="">
        </div>

        <FightBottom />
        <FightStatus v-if="isFightStatusVisible" :title="fightStatusTitle" />
        <FightMessage />

        <div class="arena__field field">
            <div class="field__wrapper">
                <FightPersonage
                    v-for="personage in allPersonages"
                    v-if="personage.id"
                    :key="personage.id"
                    :personage="personage"
                    @attack="test"
                />
            </div>
        </div>

        <div class="test-btn" @click.once="startFight()">начать бой</div>
    </div>
    <!-- https://www.youtube.com/watch?v=y7Cq-0rXnB0 тут пример боевки -->
</template>

<script>
import Header from './interface/Header';
import FightStatus from './interface/arena/FightStatus';
import FightMessage from './interface/arena/FightMessage';
import FightBottom from './interface/arena/FightBottom';
import FightPersonage from './interface/arena/FightPersonage';

export default {
    name: 'Arena',
    components: {
        Header,
        FightStatus,
        FightMessage,
        FightBottom,
        FightPersonage
    },
    data() {
        return {
            isSelectEnemy: false,
            enemySelected: '',
            fightStatusTitle: '',
            isFightStatusVisible: false,

            enemies: [],
            team: []
        };
    },
    mounted() {
        // TODO: почему то свойством: 'default' не смог расширить. начались проблемы с рендерингом. Он стал некорректным.(генерация класса в бою)
        this.enemies = this.personageGenerator(this.getArenaInfo.enemies, 'enemy');
        this.team = this.personageGenerator(this.getPersonages, 'team');
    },
    computed: {
        allPersonages() {
            let array = [];
            array.push(...this.team);
            array.push(...this.enemies);
            return array;
        },
        ...mapGetters('gameInfo', ['getArenaInfo']),
        ...mapGetters('data', ['getPersonages'])
    },
    methods: {
        personageGenerator(array, teamName) {
            let arr = JSON.parse(JSON.stringify(array));
            arr.forEach((personage, index) => {
                personage.index = index;
                personage.type = teamName;
                personage.maxHP = personage.hp;
                personage.maxPower = personage.power;
                personage.maxMana = personage.mana;
                personage.img = `personages/${personage.avatar}/ava1.png`;
            });

            return arr;
        },
        test(enemy) {
            this.isSelectEnemy = true;
            this.enemySelected = enemy;
        },
        startFight(whosFirst) {
            let userArray = this.allPersonages.filter(personage => {
                return personage.type === 'team';
            });
            let computerArray = this.allPersonages.filter(personage => {
                return personage.type !== 'team';
            });

            // Вначале игры определяем, кто ходит первым
            if (!whosFirst) {
                whosFirst = this.chooseWhosFirstMove();
            }
            whosFirst === 'team' ? this.userMove(userArray, computerArray) : this.computerMove(computerArray, userArray);
        },
        chooseWhosFirstMove() {
            let maxPower = 0;
            let type = '';

            this.allPersonages.forEach(personage => {
                if (personage.str > maxPower) {
                    maxPower = personage.str;
                    type = personage.type;
                }
            });
            return type;
        },
        userMove(userArray, computerArray) {
            // по очереди ходит вся команда
            if (userArray.length > 0) {
                this.teamMemberMove(userArray, computerArray);
            } else {
                console.log('Вся команда походила');
                this.startFight('enemy');
            }
        },
        computerMove(computerArray, userArray) {
            if (computerArray.length > 0) {
                this.teamMemberMove(computerArray, userArray);
            } else {
                console.log('Все враги походили');
                this.startFight('team');
            }
        },
        teamMemberMove(team, otherTeam) {
            let isComputerTurn = team[0].type === 'enemy';

            // Выходит в центр
            if (!isComputerTurn) {
                this.moveToCenter(team[0]);
            }
            if (isComputerTurn) {
                this.isSelectEnemy = true; // Не ждем хода человека
            }
            // Ждем, пока user нажмет на врага
            let timer = setInterval(() => {
                console.log('waiting for user touch');
                if (this.isSelectEnemy) {
                    // Сбрасываем данные о клике
                    this.isSelectEnemy = false;
                    clearInterval(timer);

                    // Выбор рандомного соперника, когда ходит противник
                    if (isComputerTurn) {
                        let opponentTeamLength = otherTeam.length;
                        let randomOpponent = Math.floor(Math.random() * opponentTeamLength);
                        this.enemySelected = otherTeam[randomOpponent].id;
                    }

                    // Подойти текущим персонажем к выбранному врагу
                    let currentPersonage = this.allPersonages.find(personage => {
                        return team[0].id === personage.id;
                    });
                    let currentEnemy = this.allPersonages.find(enemy => {
                        return this.enemySelected === enemy.id;
                    });
                    currentPersonage.position = 'nearbyenemy';
                    currentPersonage.enemy = currentEnemy;
                    setTimeout(() => {
                        // TODO: Анимация Удара

                        // Отнять хп
                        currentEnemy.hp -= currentPersonage.str;

                        // Если враг умер - вырезаем его из массива
                        if (currentEnemy.hp <= 0) {
                            currentEnemy.hp = 0;
                            console.log('враг умер');
                            let opponentTeamArray = isComputerTurn ? this.team : this.enemies;

                            opponentTeamArray.forEach((personage, index) => {
                                if (personage.hp < 1) {
                                    opponentTeamArray.splice(index, 1);
                                }
                            });

                            if (opponentTeamArray.length === 0) {
                                let titleMessage = team[0].type === 'team' ? 'Победа!' : 'Поражение...';
                                this.fightStatusTitle = titleMessage;
                                this.isFightStatusVisible = true;
                            }
                        }

                        // Вернуться на default позицию
                        currentPersonage.enemy = false;
                        currentPersonage.position = 'default';

                        // ходит оставшаяся часть команды
                        let newArray = team.slice(1);
                        if (!isComputerTurn) {
                            this.userMove(newArray, otherTeam);
                        } else {
                            this.computerMove(newArray, otherTeam);
                        }
                    }, 1000);
                }
            }, 500); // TODO: поменять на меньшее число. 50, 100, например
        },
        moveToCenter(personage) {
            personage.position = 'center';
        }
    }
};
</script>

<style lang="scss" scoped>
.field {
  position: absolute;
  width: 100%;
  height: calc(100% - 85px);
  bottom: 50px;
  &__wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }
}
.test-btn {
  position: fixed;
  width: 200px;
  height: 40px;
  cursor: pointer;
  left: 50%;
  top: 200px;
  background: #eee;
  text-align: center;
  line-height: 40px;
  border-radius: 6px;
}
	.arena {
    &__bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      img {
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
      }
    }

  }

</style>
