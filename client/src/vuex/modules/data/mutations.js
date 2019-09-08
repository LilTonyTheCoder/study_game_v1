export default {
    loadData(state, payload) {
        state.goods = payload.goods;
        state.personages = payload.personages;
        state.skills = payload.skills;
        state.missionsNew = payload.missionsNew;
    },
    addGoods(state, payload) {
        state.goods[payload.name] += payload.count;
    },
    changeMissionProgress(state, payload) {
        let currentChild = state.missionsNew.allItems.find(mission => mission.id === payload.child);
        currentChild.items.find(mission => mission.id === payload.id).persentPass = payload.progress;
    },
    buyPersonage(state, payload) {
        let personage = state.personages.find(personage => personage.id === payload);
        personage.available = true;
        state.goods.gold -= personage.cost;
    },
    changeCurrentRegMision(state, payload) {
        state.missionsNew.currentRegularMission = payload;
    }
};
