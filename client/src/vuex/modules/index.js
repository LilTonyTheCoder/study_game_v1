export default {
    gameInfo: {
        namespaced: true,
        state: {
            isLoading: true,
            currentLocation: 'menu',
            currentMenuScreen: 'MenuMainList',
            // Все данные для текущего боя
            currentArenaInfo: '',
            activeTeam: []
        },
        mutations: {
        	stopLoading(state) {
        		state.isLoading = false;
        	},
            changeMenuScreen(state, payload) {
                state.currentMenuScreen = payload;
            },
            changeLocation(state, payload) {
                state.currentLocation = payload;
            },
            setArenaInfo(state, payload) {
                state.currentArenaInfo = payload;
            },
            removeFromActiveTeam(state, payload) {
                state.activeTeam = state.activeTeam.filter(persId => persId !== payload);
            },
            addToActiveTeam(state, payload) {
                state.activeTeam.push(payload);
            }
        },
        getters: {
            getArenaInfo: state => {
                return state.currentArenaInfo;
            }
        }
    },
    data: {
        namespaced: true,
        state: {
            goods: '',
            missions: '',
            personages: ''
        },
        mutations: {
            loadData(state, payload) {
                state.goods = payload.goods;
                state.missions = payload.missions;
                state.personages = payload.personages;
            },
            addGoods(state, payload) {
                state.goods[payload.name] += payload.count;
            },
            changeMissionProgress(state, payload) {
                state.missions.find(mission => mission.id === payload.id).persentPass = payload.progress;
            },
            buyPersonage(state, payload) {
                let personage = state.personages.find(personage => personage.id === payload);
                personage.available = true;
                state.goods.gold -= personage.cost;
            }
        },
        getters: {
            getMissions: state => {
                return state.missions;
            },
            getPersonages: state => {
                return state.personages;
            },
            getGoods: state => {
                return state.goods;
            }
        }
    }
};
