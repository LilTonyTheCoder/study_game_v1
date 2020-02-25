export default {
    loadData(state, payload) {
        state.goods = payload.goods;
        state.personages = payload.personages;
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
    },
    addExperience(state, payload) {
        payload.activeTeam.forEach(persId => {
            let personageInState = state.personages.find(el => el.id === persId);
            personageInState.attributes.xp += payload.xp;
        });
    },
    subtractEnergy(state, payload) {
        payload.activeTeam.forEach(persId => {
            let personageInState = state.personages.find(el => el.id === persId);
            personageInState.attributes.energy -= payload.energy;
        });
    },
    addEnergyToOnePersonage(state, payload) {
        const personageInState = state.personages.find(personage => personage.id === payload.id);
        personageInState.attributes.energy += payload.amount;
        if (personageInState.attributes.energy>state.maximumEnergy) personageInState.attributes.energy = state.maximumEnergy;
    },
    increaseEnergy(state, payload) {
        state.personages.forEach(personage => {
            if (personage.attributes.energy >= state.maximumEnergy) return;
            personage.attributes.energy += payload;
            if (personage.attributes.energy >= state.maximumEnergy) personage.attributes.energy = state.maximumEnergy;
        });
    },
    startPersonageTraining(state, id) {
        let personage = state.personages.find(personage => personage.id === id);
        personage.trainingStartsAt = new Date();
    }
};
