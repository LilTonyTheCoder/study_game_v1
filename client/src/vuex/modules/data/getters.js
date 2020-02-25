export default {
    getMissions: state => {
        return state.missions;
    },
    getPersonages: state => {
        return state.personages;
    },
    getAvailablesPersonages: state => {
        return state.personages.filter(el => el.available);
    },
    getGoods: state => {
        return state.goods;
    },
    getMissionsNew: state => {
    	return state.missionsNew;
    }
};
