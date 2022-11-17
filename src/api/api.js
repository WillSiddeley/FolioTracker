const axios = require("axios");

const instance = axios.create({

    baseURL: 'http://192.168.2.222:3001'
    
});

export default instance;