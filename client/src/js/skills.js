const skills = [
    {
        name: 'default-hit',
        manaCost: 0,
        damageCalc(str) {
            return str;
        }
    },
    {
        name: 'skill1',
        manaCost: 50,
        damageCalc(str) {
            return str*10;
        }
    },
    {
        name: 'skill2',
        manaCost: 1000
    },
    {
        name: 'skill3',
        manaCost: 1000
    }
]

export default skills;
