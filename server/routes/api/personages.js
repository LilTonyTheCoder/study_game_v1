const personages = [
	{
		name: 'Треворз',
		id: 'sf99799aw',
		lvl: 4,
		str: 10,
		def: 10,
		hp: 200,
		mana: 300,
		power: 100,
		maxPower: 120,
		xp: 277,
		nextLvlXp: 380,
		avatar: 'trevor',
		position: 'default',
		skills: [
			{
				name: 'skill1',
				lvl: 2
			},
			{
				name: 'skill2',
				lvl: 6
			},
			{
				name: 'skill3',
				lvl: 10
			}
		],
		available: true
	},
	{
		id: 'b1og6912x',
		name: 'Амазония',
		lvl: 3,
		str: 1000,
		def: 10,
		hp: 300,
		mana: 300,
		power: 100,
		maxPower: 100,
		xp: 277,
		nextLvlXp: 380,
		avatar: 'amazonia',
		position: 'default',
		cost: 800,
		skills: [
			{
				name: 'skill1',
				lvl: 2
			},
			{
				name: 'skill2',
				lvl: 6
			}
		],
		available: false
	}
];

module.exports = personages;