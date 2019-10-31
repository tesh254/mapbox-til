import axios from 'axios';

export default () => {
    return axios
        .get('https://data.cityofnewyork.us/resource/yjub-udmw.json')
}