export default {
    gameInfo: {
        namespaced: true,
        state: {
            isLoading: true,
            currentLocation: 'menu'
        },
        mutations: {
        	stopLoading (state) {
        		state.isLoading = false;
        	}
        }
    }
};
