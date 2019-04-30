export default {
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
}