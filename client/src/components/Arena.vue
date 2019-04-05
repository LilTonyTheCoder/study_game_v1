<template>
	<div class="arena std-block">
    <Header></Header>
    <div class="arena__bg">
      <img src="~img/locations/location1.jpeg" alt="">
    </div>
    
    <FightBottom />
    <FightStatus />
    <FightMessage />

    <div class="arena__field field">
      <div class="field__wrapper">
        <FightPersonage v-for="personage in allPersonages" :personage="personage" />
      </div>
    </div>
    
    <div class="test-btn" @click="startFight()">начать бой</div>
	</div>
  <!-- https://www.youtube.com/watch?v=y7Cq-0rXnB0 тут пример боевки -->
</template>


<script>
import Header from "./interface/Header";
import FightStatus from "./interface/arena/FightStatus";
import FightMessage from "./interface/arena/FightMessage";
import FightBottom from "./interface/arena/FightBottom";
import FightPersonage from "./interface/arena/FightPersonage"

export default {
  name: 'Arena',
  components: {
    Header,
    FightStatus,
    FightMessage,
    FightBottom,
    FightPersonage
  },
  data () {
    return {
      isSelectEnemy: false,
      enemies: [{
        id: 'test1',
        lvl: 5,
        index: 0,
        img: 'pers-enemy.png',

        str: 20,
        def: 20,
        dex: 10,
        crit: 10,

        maxHP: 500,
        hp: 500,
        maxMana: 300,
        mana: 300,
        maxPower: 100,
        power: 90,

        type: 'enemy',

        position: 'default',
        state: {
            animation: '',
        },
      },{
        id: 'test2',
        lvl: 35,
        index: 1,
        img: 'pers-enemy.png',
        
        str: 20,
        def: 20,
        dex: 10,
        crit: 10,

        maxHP: 500,
        hp: 400,
        maxMana: 300,
        mana: 300,
        maxPower: 100,
        power: 100,

        type: 'enemy',

        position: 'default',
        state: {
            animation: '',
        },
      }],
      team: [{
        id: 'test3',
        lvl: 5,
        index: 0,
        img: 'pers-test-min.png',

        str: 200,
        def: 20,
        dex: 10,
        crit: 10,

        maxHP: 500,
        hp: 500,
        maxMana: 300,
        mana: 300,
        maxPower: 100,
        power: 100,

        type: 'team',

        position: 'default',
        state: {
            animation: '',
        }
      }]
    }
  },
  mounted() {
    this.$on('attack', () => {this.isSelectEnemy = true}); // TODO: не слушается  
  },
  computed: {
    allPersonages() {
      let array = [];
      array.push(...this.team);
      array.push(...this.enemies);
      return array;
    }
  },
  methods: {
    startFight() {
      let teamArray = this.allPersonages.filter((personage) => {
        return personage.type === 'team';
      });

      let whosFirst = this.chooseWhosFirstMove();
      whosFirst === 'team' ? this.teamMove(teamArray) : this.enemyMove();
    },
    chooseWhosFirstMove() {
      let maxPower = 0;
      let type = '';

      this.allPersonages.forEach((personage) => {
        if (personage.str > maxPower) {
          maxPower = personage.str;
          type = personage.type;
        }
      })
      return type;
    },
    teamMove(teamArray) {
      if (teamArray.length>0) {
        this.teamMemberMove(teamArray);
      }
    },
    teamMemberMove(team) {
      this.moveToCenter(team[0]);
      // this.attackEnemy();

      let timer = setInterval(function(){
        console.log('waiting');
        if (this.isSelectEnemy) {
          clearInterval(timer);
          // ходит оставшаяся часть команды
          let newArray = team.slice(1);
          this.teamMove(newArray);
        }
      }, 500);
    },
    moveToCenter(personage) {
      personage.position = 'center';
    }
  },
}
</script>


<style lang="scss">
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
@keyframes pulse {
    0%  {transform: scaleY(1);}
    50% {transform: scaleY(0.95);}
    100% {transform: scaleY(1);}
}
@keyframes punch {
    0%  {transform: rotate(0deg);}
    50% {transform: rotate(10deg);}
    100% {transform: rotate(0deg);}
}
@keyframes punchReverse {
    0%  {transform: rotate(0deg);}
    50% {transform: rotate(-10deg);}
    100% {transform: rotate(0deg);}
}
@keyframes death {
    0%  {opacity: 1;}
    100% {opacity: 0;}
}
</style>