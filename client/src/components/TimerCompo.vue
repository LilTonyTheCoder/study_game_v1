<template>
    <transition name="fade">
        <div class="timer hide"></div>
    </transition>
</template>

<script>
export default {
    name: 'TimerCompo',
    data() {
        return {
            timer: ''
        };
    },
    computed: {
        ...mapGetters('data', ['getPersonages']),
        ...mapState('gameInfo', ['tickers'])
    },
    mounted() {
        this.createFirstTimerTickers();
        this.startTimer();
    },
    methods: {
        createFirstTimerTickers() {
            this.tickers.forEach(timer => {
                if (timer.lastTime === 0) {
                    const currentTime = Date.now();
                    this.updateTicker({ name: timer.name, lastTime: currentTime });
                }
            });
        },
        startTimer() {
            this.timer = setInterval(() => {
                this.tickers.forEach(timer => {
                    const currentTime = Date.now();
                    if (currentTime > timer.lastTime + timer.interval) {
                        this.updateTicker({ name: timer.name, lastTime: currentTime });
                        this[timer.name](timer.prop);
                    }
                });
            }, 100);
        },
        addEnergy(amount) {
            this.increaseEnergy(amount);
        },
        oneSecondPass() {
            // требуется для всяких счетчиков
            // console.log('Прошла секунда');
        },
        ...mapMutations('data', ['increaseEnergy']),
        ...mapMutations('gameInfo', ['updateTicker'])
    }
};
</script>
