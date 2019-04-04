import axios from 'axios';

const url = '/api/data/';

class DataService {
    // Get Data
    static getData() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const { data } = res;
                resolve(data);
            } catch (err) {
                reject(err);
            }
        });
    }
}

export default DataService;
