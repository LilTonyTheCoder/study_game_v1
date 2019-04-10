export default {
    gameInfo: {
        namespaced: true,
        state: {
            isLoading: true,
            currentLocation: 'menu',
            currentMenuScreen: 'MenuMainList',
            // Все данные для текущего боя
            currentArenaInfo: ''
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
            }
        },
        getters: {
            getMissions: state => {
                return state.missions;
            },
            getPersonages: state => {
                return state.personages;
            }
        }
    }
};
