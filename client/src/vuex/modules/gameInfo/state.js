export default {
    isLoading: true,
    currentLocation: 'MainMenu',
    currentMenuScreen: 'MainList',
    selectedMissionId: '',
    // Все данные для текущего боя
    currentArenaInfo: '',
    activeTeam: [],
    tickers: [{
        name: 'addEnergy',
        lastTime: 0, // ex: 1569362768048
        interval: 30000,
        prop: 10 // на сколько увеличиваем энергию
    }, {
        name: 'oneSecondPass',
        lastTime: 0,
        interval: 1000
    }]
};
