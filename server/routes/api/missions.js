const missions = [
	{
	  id: 'yhaejmmrn',
	  name: 'Отъявленные отморозки',
	  energyCost: 1,
	  persentPass: 0,
	  reward: [
	  	  {
	  	  	name: 'gold',
	  	  	count: 10
	  	  },
	  	  {
	  	  	name: 'xp',
	  	  	count: 7
	  	  },
	  	  {
	  	  	name: 'platinum',
	  	  	count: 10
	  	  }	
	  ],
	  enemies: [
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
	  id: "x3fihmeym",
	  name: 'Неприятная встреча',
	  energyCost: 1,
	  persentPass: 0,
	  reward: [
	  	  {
	  	  	name: 'gold',
	  	  	count: 10
	  	  },
	  	  {
	  	  	name: 'xp',
	  	  	count: 7
	  	  }
	  ],
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