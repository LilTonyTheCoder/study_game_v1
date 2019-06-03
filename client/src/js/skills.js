const skills = [
    {
        name: 'default-hit',
        manaCost: 0,
        nameRus: 'Удар кинжалом',
        verb: 'Одиночный удар',
        damageCalc(str) {
            return str;
        }
    },
    {
        name: 'skill1',
        manaCost: 50,
        nameRus: 'Мега удар кинжалом',
        verb: 'Мощный одиночный удар',
        damageCalc(str) {
            return str * 10;
        }
    },
    {
        name: 'skill2',
        nameRus: 'Удар кинжалом',
        verb: 'Одиночный удар',
        manaCost: 1000
    },
    {
        name: 'skill3',
        nameRus: 'Удар кинжалом',
        verb: 'Одиночный удар',
        manaCost: 1000
    },
    {
        name: 'amazonia-hit',
        nameRus: 'Стрела из лука',
        verb: 'Одиночный выстрел',
        manaCost: 0,
        dontComeClose: true,
        animationDuration: 800,
        damageCalc(str) {
            return 15;
        }
    }
];

export default skills;
