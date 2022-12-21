import WebConstants from "../constants/WebConstants";
const axios = require("axios");

export default axios.create({

    baseURL: WebConstants.websiteAPI
    
});