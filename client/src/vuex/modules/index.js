export default {
    gameInfo: {
        namespaced: true,
        state: {
            isLoading: true,
            currentLocation: 'menu',
            currentMenuScreen: 'MenuMainList'
        },
        mutations: {
        	stopLoading (state) {
        		state.isLoading = false;
        	},
            changeMenuScreen(state, payload) {
                state.currentMenuScreen = payload;
            },
            changeLocation(state, payload) {
                state.currentLocation = payload;
            }
        }
    }
};
