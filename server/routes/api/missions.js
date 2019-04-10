const missions = [
	{
	  name: 'Отъявленные отморозки',
	  xp: 7,
	  gold: 10,
	  energyCost: 5,
	  persentPass: 50,
	  enemies: [
	    {
	      name: 'Тревор',
	      id: '9onei62zn',
	      lvl: 4,
	      str: 10,
	      def: 10,
	      hp: 200,
	      mana: 300,
	      power: 100,
	      avatar: 'evil-trevor',
	      position: 'default'
	    },
	    {
	      name: 'Амазония',
	      id: 'vn0s8admf',
	      lvl: 10,
	      str: 10,
	      def: 10,
	      hp: 200,
	      mana: 300,
	      power: 100,
	      avatar: 'evil-trevor',
	      position: 'default'
	    }
	  ]
	},
	{
	  name: 'Неприятная встреча',
	  xp: 10,
	  gold: 10,
	  energyCost: 5,
	  persentPass: 0,
	  enemies: [
	    {
	      name: 'Тревор',
	      id: '9onei62zn',
	      lvl: 20,
	      str: 1000,
	      def: 10,
	      hp: 2000,
	      mana: 300,
	      power: 100,
	      avatar: 'evil-trevor',
	      position: 'default'
	    }
	  ]
	}
];

module.exports = missions;