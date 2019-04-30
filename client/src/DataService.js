import axios from 'axios';

const url = '/api/data/';

class DataService {
    // Get Data
    static async getData() {
        let response;
        try {
            response = await axios.get(url);
        } catch (error) {
            console.error(error);
        }

        return response.data;
    }
}

export default DataService;
