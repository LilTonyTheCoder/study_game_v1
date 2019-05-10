export default {
    loadData(state, payload) {
        state.goods = payload.goods;
        state.missions = payload.missions;
        state.personages = payload.personages;
        state.skills = payload.skills;
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
};
